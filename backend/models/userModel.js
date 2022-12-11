const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false, // with this when we use findquery in database all other fields will  showed except password that's why we use select:false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

//this is like an save event when user schema is save password will also also be encrypted
userSchema.pre("save", async function (next) {
    //this if condition will be use when password is changed if password is change then this will make password encrypted that new password
    if (!this.isModified("password")) {
        //this.--means userShema in userSchema it will check password field is changed
        next();
    }

    this.password = await bcrypt.hash(this.password, 10); //this 10 number shows that how much powerful will be your password you can also use 12 it will be more powerful than 10 but 10 is recommended
});

//JWT TOKEN ---we will generate a token and store it in cookies
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    }); //this._id means userSchema ke ander jo _id hai  // creating token --payload
};

//Compare password which we will use in login function in userController
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
