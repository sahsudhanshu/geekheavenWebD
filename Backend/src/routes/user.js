import { Router } from 'express';
import User from '../models/User.js';
import { tokenChecker } from '../utils/authMiddleware.js';

const user = Router()

user.use(tokenChecker);


user.post('/bookmark', async (req, res) => {
    try {

        const { questionId } = req.body
        const user = await User.findById(req.user._id)
        const itemIdx = user[bookmarkedQues].indexOf(questionId)

        if (itemIdx) {
            user.bookmarkedQues.pull(questionId);
        } else {
            user.bookmarkedQues.push(questionId);
        }
        await user.save();
        res.json({ bookmarkedQues: user.bookmarkedQues });
    }
    catch (e) {
        console.log(e)
        res.json({ message: 'Server Error' });
    }
})
user.post('/completed', async (req, res) => {
    try {

        const { questionId } = req.body
        const user = await User.findById(req.user._id)
        const itemIdx = user[completedQues].indexOf(questionId)

        if (itemIdx) {
            user.completedQues.pull(questionId);
        } else {
            user.completedQues.push(questionId);
        }
        await user.save();
        res.json({ completedQues: user.completedQues });
    }
    catch (e) {
        console.log(e)
        res.json({ message: 'Server Error' });
    }
})

export default user