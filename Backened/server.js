import express from "express";
import 'dotenv/config'
import connectDB from "./src/config/database.js";
import questionsRoute from "./src/routes/questions.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI
const DB_NAME = process.env.DB_NAME || 'Test'

app.get('/', (req, res) => {
    res.send("API is running")
})

app.use('/api/v1/questions', questionsRoute)

connectDB(MONGODB_CONNECTION_URI, DB_NAME).then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server`);
        console.log(`URL: ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
    })
}).catch((e) => {
    console.log(e)
})