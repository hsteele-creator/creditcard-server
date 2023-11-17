const express = require('express')
const router = express.Router();
const db = require("../db")


// get all transactions
router.get('/:userId', async (req, res) => {
   const {userId} = req.params
   try {
      const results = await db.query('SELECT * FROM transactions WHERE user_id = $1', [userId]);
      res.json(results.rows)
   } catch(e) {
      console.error(e)
   }

})

// add a new transaction
router.post('/add-transaction', async (req, res) => {
   const {title, amount, month, day, year, user_id, card_number, transaction_type} = req.body

   console.log(title, amount, month, day, year, user_id, card_number, transaction_type)

   try {

      const cardId = await db.query('SELECT id FROM credit_cards WHERE card_number = $1', [card_number]);

      console.log(cardId.rows)

      // console.log(cardId.rows[0].id)

      const results = await db.query("INSERT INTO transactions (title, amount, month, day, year, user_id, card_id, transaction_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [title, amount, month, day, year, user_id, cardId.rows[0].id, transaction_type]);

      res.json(results.rows)
   } catch(e) {
      console.error(e)
      if(e) {
         return res.json({detail : e.detail})
      }
   }
})

module.exports = router