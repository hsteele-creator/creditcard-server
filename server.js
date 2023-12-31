const dotenv = require('dotenv');
dotenv.config({path : './.env'})
const PORT = process.env.PORT || 8000
const authRoutes = require("./routes/authRoutes")
const cardRoutes = require("./routes/cardRoutes")
const transactionRoutes = require("./routes/transactionRoutes")

const cors = require('cors')

const express = require('express')
const app = express()

app.use(cors());
app.use(express.json())

app.use("/auth", authRoutes);
app.use("/cards", cardRoutes);
app.use("/transactions", transactionRoutes);

app.listen(PORT)

 // "build": "react-scripts build",
    // "test": "react-scripts text",
    // "eject": "react-scripts eject"