const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  return res.json({ message: "node server" });
});

server.post("/geo", (req, res) => {
  const data = req.body;

  return res.json(data);
});

server.listen(3000);
