const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// GET all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new expense
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update expense
router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE expense
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.delete("/all", async (req, res) => {
//   await Expense.deleteMany({});
//   res.json({ message: "All expenses deleted" });
// });

module.exports = router;
