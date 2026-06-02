const express = require("express");
const cors = require("cors");
require("dotenv").config();

const gamesRoutes = require("./routes/games");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/games", gamesRoutes);

app.get("/", (req, res) => {
  res.send("Backend töötab");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server töötab pordil ${PORT}`);
});