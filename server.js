import express from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // Note: No need to specify "/promise" since you're using mysql2 as a Promise.
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import dotenv from "dotenv"; // Add import for dotenv

// Allows us to access the .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // default port to listen

const corsOptions = {
  origin: "*",
  credentials: true,
  "access-control-allow-credentials": true,
  optionSuccessStatus: 200,
};

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

app.use(cors(corsOptions));

// Makes Express parse the JSON body of any requests and adds the body to the req object
app.use(bodyParser.json());

// Test connection route before any middleware that requires auth
app.get("/test-connection", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS solution");
    res.json({ success: true, solution: rows[0].solution });
  } catch (err) {
    console.error("Error in /test-connection:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use(async (req, res, next) => {
  try {
    // Connecting to our SQL db. req gets modified and is available down the line in other middleware and endpoint functions
    req.db = await pool.getConnection();
    req.db.connection.config.namedPlaceholders = true;

    // Traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc.
    await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
    await req.db.query(`SET time_zone = '-8:00'`);

    // Moves the request on down the line to the next middleware functions and/or the endpoint it's headed for
    await next();

    // After the endpoint has been reached and resolved, disconnects from the database
    req.db.release();
  } catch (err) {
    // If anything downstream throw an error, we must release the connection allocated for the request
    console.log(err);
    // If an error occurs, disconnects from the database
    if (req.db) req.db.release();
    throw err;
  }
});


app.get("/test", async (req, res) => {
  const car = {
    make: "Honda",
    model: "Civic",
    year: 2010,
  };

  console.log("/test endpoint reached");
  const query = await req.db.query(`SELECT * FROM cars_data.car`);

  res.json(query);
});

// Hashes the password and inserts the info into the `user` table

const checkEmailUniqueness = async (email) => {
  const [[user]] = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
  return !user;
};

// /register endpoint in Express
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const isEmailUnique = await checkEmailUniqueness(email);

    if (!isEmailUnique) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(`INSERT INTO users (email, password) VALUES (?,?)`, [email, hashedPassword]);

    res.json({ success: true });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/register", (req, res) => {
//   // Handle GET requests to the "/register" endpoint
//   res.send("Register page");
// });


//log in user
app.post("/log-in", async function (req, res) {
  try {
    const { username, password: userEnteredPassword } = req.body;

    const [[user]] = await req.db.query(
      `SELECT * FROM user WHERE user_name = :username`,
      { username }
    );

    if (!user) res.json("Username not found");

    const hashedPassword = `${user.password}`;
    const passwordMatches = await bcrypt.compare(
      userEnteredPassword,
      hashedPassword
    );

    if (passwordMatches) {
      const payload = {
        userId: user.id,
        username: user.username,
        userIsAdmin: user.admin_flag,
      };

      const jwtEncodedUser = jwt.sign(payload, process.env.JWT_KEY);

      res.json({ jwt: jwtEncodedUser, success: true });
    } else {
      res.json({ err: "Password is wrong", success: false });
    }
  } catch (err) {
    console.log("Error in /authenticate", err);
  }
});

// Jwt verification checks to see if there is an authorization header with a valid jwt in it.
app.use(async function verifyJwt(req, res, next) {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    console.error("Missing authorization header");
    // Allow access to the register endpoint without requiring JWT token
    if (req.path === "/register") {
      return next();
    }
    return res.status(401).json({ error: "Invalid authorization, no authorization headers" });
  }

  const [scheme, jwtToken] = authHeader.split(" ");

  if (scheme !== "Bearer") {
    console.error("Invalid authorization scheme");
    return res.status(401).json({ error: "Invalid authorization, invalid authorization scheme" });
  }

  try {
    const decodedJwtObject = jwt.verify(jwtToken, process.env.JWT_KEY);
    req.user = decodedJwtObject;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ error: "Invalid JWT token" });
  }
});


app.post("/car", async (req, res) => {
  const { newMakeValue, newModelValue, newYearValue } = req.body;

  const { userId } = req.user;

  const [insert] = await req.db.query(
    `
    INSERT INTO car (make, model, year, date_created, user_id, deleted_flag)
    VALUES (:newMakeValue, :newModelValue, :newYearValue, NOW(), :user_id, :deleted_flag);
  `,
    {
      newMakeValue,
      newModelValue,
      newYearValue,
      user_id: userId,
      deleted_flag: 0,
    }
  );

  // Attaches JSON content to the response
  res.json({
    id: insert.insertId,
    newMakeValue,
    newModelValue,
    newYearValue,
    userId,
  });
});

app.put("/car", async (req, res) => {
  const { id, make, model, year } = req.body;

  const [cars] = await req.db.query(
    `UPDATE car SET make = :make, model = :model, year = :year WHERE id = :id;`,
    {
      id,
      make,
      model,
      year,
    }
  );

  // Attaches JSON content to the response
  res.json({ id, make, model, year, success: true });
});

// Creates a GET endpoint at <WHATEVER_THE_BASE_URL_IS>/car
app.get("/car", async (req, res) => {
  const { userId } = req.user;

  const [cars] = await req.db.query(
    `SELECT * FROM cars_data.car WHERE user_id = :userId AND deleted_flag = 0;`,
    { userId }
  );

  // Attaches JSON content to the response
  res.json({ cars });
});

app.delete("/car/:id", async (req, res) => {
  const { id: carId } = req.params;

  await req.db.query(`UPDATE car SET deleted_flag = 1 WHERE id = :carId`, {
    carId,
  });

  res.json({ success: true });
});

// Start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
