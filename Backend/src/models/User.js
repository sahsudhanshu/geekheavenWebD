import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs';


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

const User = model('User', userSchema)

export default User;