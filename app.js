import "dotenv/config";

import cors from "cors";
import dns from "dns";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import router from "./app/routers/api.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Security features
app.use(helmet());

// Body parser
app.use(
  express.json({
    limit: process.env.MAX_JSON_SIZE || "10kb",
  }),
);

app.use(
  express.urlencoded({
    extended: process.env.URL_ENCODE === "true",
  }),
);

// Rate limiter
const limiter = rateLimit({
  windowMs: Number(process.env.MAX_REQ_LIMIT) || 20000,
  limit: Number(process.env.MAX_REQ_LIMITING_TIME) || 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);

// ETag
app.set("etag", process.env.WEB_CATCH || "weak");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// MongoDB connection
mongoose
  .connect(process.env.DB_URL, { autoIndex: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });

// Request logger (development)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api", router);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
