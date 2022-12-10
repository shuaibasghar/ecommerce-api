const app = require("./app");
const cors = require("cors");
const dotenv = require("dotenv");
const connnectDatabase = require("./config/database");
//config path
dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connnectDatabase();

//cors for romoving cors error policy
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
