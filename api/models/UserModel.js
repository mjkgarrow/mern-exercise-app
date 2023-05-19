import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import validator from 'validator'


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.register = async function (email, password) {

    if (!email || !password) {
        throw Error('Missing email or password')
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }

    if (!validator.isStrongPassword(password)) {

        throw Error('Password must be at least 8 characters with uppercase, lowercase, numbers, and a symbol')
    }

    if (await this.findOne({ email })) {
        throw new Error('Email already registered')
    }

    const salt = bcrypt.genSaltSync(10);
    console.log(salt)
    const hash = bcrypt.hashSync(password, salt)
    console.log(hash)
    const newUser = await this.create({ email, password: hash })

    return newUser
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Missing email or password')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('Incorrect email or password')
    }

    const match = bcrypt.compareSync(password, user.password)

    if (match) {

        return user
    } else {
        throw Error('Incorrect email or password')
    }


}


const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
