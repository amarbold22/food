import express, { Application, Request, Response } from "express";
import color from "colors"
import { connectDB } from "./config/db";
import authRoute from "./routes/user";
import userRoute from "./routes/userRoute";
import verifyRoute from "./routes/verifyRoute";
import categoryRoute from "./routes/categoryRoute";
import uploadRoute from "./routes/uploadRoute";
import foodRoute from "./routes/foodRoute";
import basketRoute from "./routes/basketRoute";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const PORT = process.env.PORT;

const app: Application = express();

connectDB(MONGO_URI);

//JSON datag Object bolgood Request iin body-d hiideg funkts - express.json()
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/foods", foodRoute);
app.use("/verify", verifyRoute);
app.use("/categories", categoryRoute);
app.use("/upload", uploadRoute);
app.use("/basket", basketRoute);

app.listen(PORT, () => console.log(color.bgMagenta("Server is running on " + PORT)));