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

 app.put("/api/tickets/:id", (req, res) => {
   const { id } = req.params;
   const updatedData = req.body;
   const data = JSON.parse(fs.readFileSync("./server/data.json", "utf-8"));
   const ticket = data.tickets.find((item: any) => item.id === Number(id));

   if(!ticket) {
     return res.status(404).json({ message: "Ticket not found" })
   }

   Object.assign(ticket, updatedData);
   fs.writeFileSync("./server/data.json", JSON.stringify(data, null, 2), 'utf-8');
   res.json(ticket);
 });

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
