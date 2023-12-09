import express from "express";
import {configDotenv} from 'dotenv'
import IndexRouter from "./routes/index.js";
import connectDB from "./config/db.js";

// Load env variables
configDotenv({
    path:'.env'
});

// Create express app
const app = express();
connectDB();

app.use(express.json());

const port = process.env.PORT;

// Routes
app.use(IndexRouter);

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
