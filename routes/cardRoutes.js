const express = require("express");
const router = express.Router();
const db = require("../db");

// Add a credit card
router.post("/add-card", async (req, res) => {
  const {
    card_number,
    cvv,
    card_type,
    exp_month,
    exp_year,
    card_holder,
    user_id,
  } = req.body;

  try {
    const results = await db.query(
      "INSERT INTO credit_cards (card_number, cvv, card_type, exp_month, exp_year, card_holder, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [card_number, cvv, card_type, exp_month, exp_year, card_holder, user_id]
    );

    return res.json(results.rows);
  } catch (e) {
    console.error(e);
    if (e) {
      res.json({ detail: e.detail });
    }
  }
});

// Get credit cards by user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  try {
    const results = await db.query(
      "SELECT * FROM credit_cards WHERE user_id = $1",
      [userId]
    );

    return res.json(results.rows);
  } catch (e) {
    console.error(e);
  }
});

// Update a card
router.patch('/update-card', async (req, res) => {
  const {id, card_number, cvv, card_type, exp_month, exp_year, card_holder} = req.body
  try {
    const results = await db.query('UPDATE credit_cards SET card_number = $1, cvv = $2, card_type = $3, exp_month = $4, exp_year = $5, card_holder = $6 WHERE id = $7 RETURNING *', [card_number, cvv, card_type, exp_month, exp_year, card_holder, id])
    return res.json(results.rows[0])
  } catch(e) {
    console.error(e)
  }
})

// Delete a card
router.delete('/delete-card/:cardId', async(req, res) => {
  const {cardId} = req.params
  try {
    const results = await db.query('DELETE FROM credit_cards WHERE id = $1 RETURNING *', [cardId])
    return res.json(results.rows[0])
  } catch(e) {
    console.error(e)
  }
})

module.exports = router;
