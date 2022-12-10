const mongoose = require("mongoose");

const connnectDatabase = () => {
    mongoose
        .connect("mongodb://localhost:27017/Ecommerce", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        .then((data) => {
            console
                .log(`MongoDb connected with server:${data.connection.host}`)
                .catch((error) => {
                    console.log("mongodb initial connection error", error);
                });
        });
};

mongoose.connection.on("error", (err) => {
    console.log("mongodb runtime error", err);
});

module.exports = connnectDatabase;
