import mongoose, { model, Schema }from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim: true,
            index:true
        },
        email:{
            type: String,
            required: true,
            unique:true,
            lowercase: true,
            trim:true
        },
        phoneNumber:{
            type: Number,
            required: true
        },
        branch:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: [true, "plz enter the Password"],
            unique: true

        },
        refreshToken:{
            type: String,
        }
    } ,
    {
        timeseries:true
    }
)

userSchema.pre("save", async function (next)
    {
        if(!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
)

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this.is,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = model("User", userSchema)