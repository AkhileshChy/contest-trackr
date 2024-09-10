import express from "express";
import dotenv from "dotenv";
import { fetchAllContests } from "./services/fetchContests.js";
import { connectDB } from "./db/connectDB.js";
import contestRoute from "./routes/contest.route.js"

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use('/api', contestRoute);


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    connectDB();
    fetchAllContests();
})