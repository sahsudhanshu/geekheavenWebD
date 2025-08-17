import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
}, { timestamps: true })

const Category = model('Category', categorySchema)
export default Category;