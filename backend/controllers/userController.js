const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");

//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicUrl",
        },
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        // user,
        token,
    });
});

//Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //checking if user has given passwrord and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("invalid Email or Password", 401));
    }
    //compare method is coming from userModel
    const isPasswordMatched = user.comparePassword(password); //this password will be input of compare function in user model
    if (!isPasswordMatched) {
        return next(new ErrorHandler("invalid Email or Password", 401));
    }

    //if pASSWORD MATCHED THEN
    const token = user.getJWTToken();

    res.status(200).json({
        success: true,
        // user,
        token,
    });
});
