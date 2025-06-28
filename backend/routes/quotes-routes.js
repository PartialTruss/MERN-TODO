import express from "express";
import { readFile } from "fs/promises";

const router = express.Router();

let quotes = [];

const readData = async () => {
  try {
    const data = await readFile(new URL("../mockdb.json", import.meta.url));
    quotes = JSON.parse(data).quotes;
  } catch (err) {
    console.error("Error loading mock database:", err);
  }
};

readData();

router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;

  const startPage = (page - 1) * limit;
  const endPage = startPage + limit;

  const paginatedQuotes = quotes.slice(startPage, endPage);
  const totalPages = Math.ceil(quotes.length / limit);

  res.json({
    items: paginatedQuotes,
    totalPages,
    currentPage: page,
  });
});
export default router;
