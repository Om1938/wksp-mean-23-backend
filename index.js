import express from "express";
import { configDotenv } from "dotenv";
import IndexRouter from "./routes/index.js";
import connectDB from "./config/db.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swaggerConfig.js";

import cookieParser from "cookie-parser";
import cors from "cors";

// Load env variables
configDotenv({
  path: ".env",
});

// Create express app
const app = express();
app.use(
  cors({
    origin: "http://10.1.16.21:4200",
    credentials: true,
  })
);
connectDB();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

// Routes
app.use(IndexRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.message.toLocaleLowerCase().includes("not authorized")) {
    return res.status(401).json({ message: err.message });
  }

  if (err.message.toLocaleLowerCase().includes("not found")) {
    return res.status(404).json({ message: err.message });
  }

  if (err.message.toLocaleLowerCase().includes("forbidden")) {
    return res.status(403).json({ message: err.message });
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(err);
  }

  res.status(500).json({ message: err.message ?? "Internal server error" });
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
