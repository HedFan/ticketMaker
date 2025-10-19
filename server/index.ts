import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/tickets", (req, res) => {
  console.log("chekc here");
  const data = JSON.parse(fs.readFileSync("./server/data.json", "utf-8"));
  res.json(data.tickets);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
