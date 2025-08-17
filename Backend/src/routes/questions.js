import { Router } from "express";
import { Question } from "../models/index.js";

const questionsRoute = Router();

questionsRoute.get('/', async (req, res) => {
    try {
        const { search, page, limit, sortBy } = req.query;
        const parsedPage = parseInt(page, 10) || 1;
        const parsedLimit = parseInt(limit, 10) || 10;
        const filter = {};
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        };
        const sort = {};
        if (sortBy) {
            const [field, order] = sortBy.split(':');
            sort[field] = order === 'desc' ? -1 : 1
        }

        const totalQues = await Question.countDocuments(filter);
        const questions = await Question.find(filter)
            .sort(sort)
            .limit(parsedLimit)
            .skip((parsedPage - 1) * parsedLimit);

        res.status(200).json({
            page: parsedPage,
            limit: parsedLimit,
            totalItems: totalQues,
            questions
        });
    } catch (e) {
        console.error(`Error fetching content: ${e}`);
        res.status(500).json({ message: 'Server Error' });
    };
});

export default questionsRoute;