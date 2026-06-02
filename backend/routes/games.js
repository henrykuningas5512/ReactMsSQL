const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");

// GET - kõik mängud
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query("SELECT * FROM Games");

    res.json(result.recordset);
  } catch (err) {
    console.error("GET viga:", err);
    res.status(500).json({ message: "Andmete küsimisel tekkis viga" });
  }
});

// POST - lisa uus mäng
router.post("/", async (req, res) => {
  try {
    const { Name, Genre, Price, Rating } = req.body;

    const pool = await poolPromise;

    await pool
      .request()
      .input("Name", sql.NVarChar, Name)
      .input("Genre", sql.NVarChar, Genre)
      .input("Price", sql.Decimal(10, 2), Price)
      .input("Rating", sql.Decimal(3, 1), Rating)
      .query(`
        INSERT INTO Games (Name, Genre, Price, Rating)
        VALUES (@Name, @Genre, @Price, @Rating)
      `);

    res.status(201).json({ message: "Mäng lisatud" });
  } catch (err) {
    console.error("POST viga:", err);
    res.status(500).json({ message: "Lisamisel tekkis viga" });
  }
});

// PUT - muuda mängu
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Genre, Price, Rating } = req.body;

    const pool = await poolPromise;

    await pool
      .request()
      .input("Id", sql.Int, id)
      .input("Name", sql.NVarChar, Name)
      .input("Genre", sql.NVarChar, Genre)
      .input("Price", sql.Decimal(10, 2), Price)
      .input("Rating", sql.Decimal(3, 1), Rating)
      .query(`
        UPDATE Games
        SET Name = @Name,
            Genre = @Genre,
            Price = @Price,
            Rating = @Rating
        WHERE Id = @Id
      `);

    res.json({ message: "Mäng muudetud" });
  } catch (err) {
    console.error("PUT viga:", err);
    res.status(500).json({ message: "Muutmisel tekkis viga" });
  }
});

// DELETE - kustuta mäng
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;

    await pool
      .request()
      .input("Id", sql.Int, id)
      .query("DELETE FROM Games WHERE Id = @Id");

    res.json({ message: "Mäng kustutatud" });
  } catch (err) {
    console.error("DELETE viga:", err);
    res.status(500).json({ message: "Kustutamisel tekkis viga" });
  }
});

module.exports = router;