import express from "express";
import 'dotenv/config'
import connectDB from "./src/config/database.js";
import cors from 'cors'
import { questionsRoute, categoryRoute, registerUser, loginUser, user } from './src/routes/index.js'
import rateLimiter from "./src/utils/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI
const DB_NAME = process.env.DB_NAME || 'Test'

app.get('/', (req, res) => {
    res.send("API is running")
})

app.use(cors())
app.use(express.json());
app.use('/api/v1/questions', questionsRoute)
app.use('/api/v1/categories', categoryRoute)
app.use('/api/v1/auth/register', rateLimiter(), registerUser)
app.use('/api/v1/auth/login', rateLimiter(), loginUser)
app.use('/api/v1/user', user)

connectDB(MONGODB_CONNECTION_URI, DB_NAME).then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server`);
        console.log(`URL: ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
    })
}).catch((e) => {
    console.log(e)
})