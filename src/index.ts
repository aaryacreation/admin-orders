import "reflect-metadata"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRouter from "./routes/productRoutes";
const PORT = process.env.PORT || 9000;


const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", // Replace with the appropriate origin URL
  optionsSuccessStatus: 200
}));

app.use(productRouter);

app.listen(PORT, () => {
  console.log("Listening to: ", PORT);
});
