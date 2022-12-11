const app = require("./app");
const cors = require("cors");
const dotenv = require("dotenv");
const connnectDatabase = require("./config/database");

//handling uncaught error/ exception like (----console.log(shuaib)-------this will give error
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log("shutting down the server due to uncaughtException error");
    process.exit(1); //this is defined in unandled promise rejection error it will automatically shutdown the server
});

// console.log(shuaib);
//config path
dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connnectDatabase();

//cors for romoving cors error policy
app.use(cors());

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection---then with this server will be shut down automatically
process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log("shutting down the server due to Unhandled Promise Rejection");

    server.close(() => {
        process.exit(1);
    });
}); //after handling this error you need to remove catch block in databse file then it will be unhandled other wise it will be handled
