const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.get("/", (req, res) => {
  Item.getAllItems((err, rows) => {
    if (err) res.status(500).json(err);
    else res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  Item.getItemById(req.params.id, (err, row) => {
    if (err) res.status(500).json(err);
    else res.json(row[0]);
  });
});

router.post("/", (req, res) => {
  Item.addItem(req.body, (err, count) => {
    if (err) res.status(500).json(err);
    else res.json(req.body);
  });
});

router.post("/:id/update", (req, res) => {
  Item.updateItem(req.params.id, req.body, (err, count) => {
    if (err) res.status(500).json(err);
    else res.json(count);
  });
});

router.delete("/:id/delete", (req, res) => {
  Item.deleteItem(req.params.id, (err, count) => {
    if (err) res.status(500).json(err);
    else res.json(count);
  });
});


module.exports = router;
