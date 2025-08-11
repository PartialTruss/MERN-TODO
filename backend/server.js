import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import quotesRoutes from "./routes/quotes-routes.js";
import todoRoutes from "./routes/todo-routes.js";
import userRoutes from "./routes/user-routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  "https://coruscating-buttercream-a2c519.netlify.app",
];

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

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quotes", quotesRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
