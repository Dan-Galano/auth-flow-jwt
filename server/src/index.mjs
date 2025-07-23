import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

//routes
import productRoute from "../routes/product.route.mjs";
import authRoute from "../routes/auth.route.mjs";
configDotenv();
const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigins = process.env.CLIENT_ORIGIN.split(",").map((origin) =>
  origin.trim().replace(/\/$/, "")
);

//middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Now listening on PORT ${PORT}`);
    });
  })
  .catch((e) => console.log(e, "Connection failed!"));

//routes
app.get("/", (req, res) => {
  res.send(
    "Hello there! This is a project created by DGLN, implementing JWT Auth using MongoDB."
  );
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

app.use("/api", authRoute);
app.use("/api/products", productRoute);
