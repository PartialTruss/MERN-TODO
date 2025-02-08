import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import quotesRoutes from "./routes/quotesRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS for Netlify frontend
app.use(
  cors({
    origin: ["https://your-frontend.netlify.app"], // Replace with your Netlify domain
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// API routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quotes", quotesRoutes);
app.use("/api/users", userRoutes);

// Use dynamic port for Render deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
