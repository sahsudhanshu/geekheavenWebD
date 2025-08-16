import { model, Schema } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    // difficulty: {
    //     type: String,
    //     required: true,
    //     enum: ['Easy', 'Medium', 'Hard'],
    // },
}, { timestamps: true })

const Question = model('Question', questionSchema)
export default Question;