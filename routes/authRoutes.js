const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");

// Register a user
router.post("/Register", async (req, res, next) => {
  const { first_name, last_name, phone, username, password, income, savings } =
    req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const results = await db.query(
      "INSERT INTO users (first_name, last_name, phone, username, password, income, savings) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [first_name, last_name, phone, username, hashedPassword, income, savings]
    );

    const token = jwt.sign(
      { id: results.rows[0].id, username: results.rows[0].username },
      "secret-key",
      { expiresIn: "1hr" }
    );

    res.json({ username, token, id: results.rows[0].id, income : results.rows[0].income, savings : results.rows[0].savings });
  } catch (e) {
    console.error(e);
    if (e) {
      res.json({ detail: e.detail });
    }
  }
});

// Login a user
router.post("/Login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const results = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    console.log(password)

    if(results.rows.length === 0) {
      res.json("User does not exist or password is incorrect");
    }

    if (await bcrypt.compare(password, results.rows[0].password)) {
      const token = jwt.sign(
        { id: results.rows[0].id, username: results.rows[0].username },
        "secret-key",
        { expiresIn: "1hr" }
      );

      return res.json({ username, token, id: results.rows[0].id, income : results.rows[0].income, savings : results.rows[0].savings});
    } else {
      res.json("User does not exist or password is incorrect");
    }
  } catch (e) {
    console.error(e);

    if (e) {
      res.json({ detail: e.detail });
    }
  }
});

// Get user data
router.get("/user-data/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const results = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return res.json(results.rows[0]);
  } catch (e) {
    console.error(e);
  }
});

// Update user data
router.patch("/update-user/:userid", async (req, res) => {
  const { first_name, last_name, new_password, username, phone } = req.body;
  const { userid } = req.params;

  // try {

  //   console.log(results.rows[0]);
  // } catch (e) {
  //   console.error(e);
  // }

  try {
    if (new_password === undefined) {
      const results = await db.query(
        "UPDATE users SET first_name = $1, last_name = $2, username = $3, phone = $4 WHERE id = $5 RETURNING *",
        [first_name, last_name, username, phone, userid]
      );
    } else {
      const hashedPassword = await bcrypt.hash(new_password, 12);
      const results = await db.query(
        "UPDATE users SET first_name = $1, last_name = $2, username = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *",
        [first_name, last_name, username, phone, hashedPassword, userid]
      );
    }
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
