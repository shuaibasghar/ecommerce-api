const mongoose = require("mongoose");

const connnectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        .then((data) => {
            console.log(
                `MongoDb connected with server:${data.connection.host}`
            );
        });
};

mongoose.connection.on("error", (err) => {
    console.log("mongodb runtime error", err);
});

module.exports = connnectDatabase;
