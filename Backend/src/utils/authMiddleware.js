import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const tokenChecker = async (req, res, next) => {

    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                res.status(401).json({ message: 'Not authorized, token failed' });
            }
            next()
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export { tokenChecker };