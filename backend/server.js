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
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quotes", quotesRoutes);
app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(
    `Server running on https://aquamarine-hummingbird-a4579f.netlify.app/`
  );
});
