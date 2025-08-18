import mongoose from 'mongoose';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv';
import { Question, Category } from './src/models/index.js';
dotenv.config();

const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI
const DB_NAME = process.env.DB_NAME || 'Test';

(async () => {

    try {
        await connectDB(MONGODB_CONNECTION_URI, DB_NAME);
        await Question.deleteMany()
        await Category.deleteMany();
        const data = await fetch('https://test-data-gules.vercel.app/data.json').then(res => res.json()).catch((e) => console.log(e));;
        for (const categoryData of data.data) {
            const quesValidation = categoryData.ques.filter((q) => q.title && (q.p1_link || q.p2_link))
            const ques = quesValidation.map(q => ({
                title: q.title,
                url: q.p1_link || q.p2_link
            }))
            if (ques.length > 0) {
                const insertedQues = await Question.insertMany(ques)
                const quesRef = insertedQues.map(q => q._id)

                const category = new Category({
                    title: categoryData.title,
                    questions: quesRef,
                });

                await category.save();
                console.log(`Category '${category.title}' imported.`);
            }
        }

        console.log('✅ Data Import Success!');
        mongoose.connection.close()
        process.exit()
    } catch (error) {
        console.error(`❌ Data Import Failed: ${error}`);
        mongoose.connection.close()
        process.exit(1)
    }
})()