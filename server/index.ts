import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const tickets = []; // временное хранилище тикетов

app.get("/tickets", (req, res) => res.json(tickets));

app.post("/tickets", (req, res) => {
  const newTicket = { id: Date.now(), ...req.body };
  tickets.push(newTicket);
  res.status(201).json(newTicket);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
