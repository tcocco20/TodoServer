import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
