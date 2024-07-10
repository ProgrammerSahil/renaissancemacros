import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import mealRouter from "./routes/mealRouter.js";

//app config
const app = express();
const port = 4000;

//middlewares
app.use(express.json());
app.use(cors());

//db connection

connectDB();

//API endpoint

app.use("/api/user", userRouter);
app.use("/api/meal", mealRouter);

app.get("/", (req, res) => {
  res.send("server working");
});

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
