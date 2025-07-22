import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Product from "../models/product.model.mjs";
import { configDotenv } from "dotenv";

//routes
import productRoute from "../routes/product.route.mjs";
import authRoute from "../routes/auth.route.mjs";
configDotenv();
const PORT = process.env.PORT || 5000;

const app = express();

const users = [
  { id: 1, username: "dgln.dev", name: "Dan" },
  { id: 2, username: "ljsalcedo.dev", name: "Jau" },
  { id: 3, username: "elijah.dev", name: "Elijah" },
  { id: 4, username: "bogs.dev", name: "Elmar" },
  { id: 5, username: "mak.dev", name: "Mak" },
];

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

app.use("/api", authRoute);
app.use("/api/products", productRoute);
