const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Get all categories
router.get("/", (req, res) => {
  Category.getAllCategories((err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get("/:id", (req, res) => {
  Category.getCategoryById(req.params.id, (err, row) => {
    if (err) res.status(500).json(err);
    else res.json(row[0]);
  });
});


router.post("/", (req, res) => {
  console.log(req, res)
  Category.addCategory(req.body, (err, count) => {
    if (err) res.status(500).json(err);
    else res.json(req.body); // or return count for number of records inserted
  });
});   

router.post("/:id/update", (req, res) => {
  Category.updateCategory(req.params.id, req.body, (err, count) => {
    if (err) res.status(500).json(err);
    else res.json(count); // or return the updated record
  });
});

router.post("/:id/delete", (req, res) => {
  Category.deleteCategory(req.params.id, (err, count) => {
    if (err) res.status(500).json(err);
    else res.json(count); // or return a success message
  });
});


module.exports = router;
