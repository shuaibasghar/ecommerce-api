const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
});

// get single product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// exports.getSingleProduct = async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//         res.status(500).json({
//             success: false,
//             message: "Product not found!",
//         });
//     }
//     res.status(200).json({
//         success: true,
//         product,
//     });
// };

//Crearte Product fucntion for admin
exports.createProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

//update porduct function for admin

exports.updateProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        usefindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Product successfully added",
        product,
    });
});

//Without error handling
// exports.updateProduct = async (req, res) => {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//         return res.status(500).json({
//             success: false,
//             message: "Product not found",
//         });
//     }
//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//         usefindAndModify: false,
//     });
//     res.status(200).json({
//         success: true,
//         message: "Product successfully added",
//         product,
//     });
// };

//Product delete for admin
exports.deleteProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    // if (!product) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Product not found",
    //     });
    // }
    await product.remove();
    res.json({
        success: true,
        message: "Product Deleted Successfully",
    });
});
