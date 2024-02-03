const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", (req, res) => {
  Product.getAllProducts((err, rows) => {
    if (err) res.status(500).json(err);
    else res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  Product.getProductById(req.params.id, (err, row) => {
    if (err) res.status(500).json(err);
    else res.json(row[0]);
  });
});

router.post("/", (req, res) => {
  Product.addProduct(req.body, (err, count) => {
    if (err) res.status(500).json(err);
    else res.json(req.body);
  });
});

router.post("/:id/update", (req, res) => {
  Product.updateProduct(req.params.id, req.body, (err, count) => {
    if (err) res.status(500).json(err);
    else res.json(count);
  });
});

router.delete("/:id/delete", (req, res) => {
  Product.deleteProduct(req.params.id, (err, count) => {
    if (err) res.status(500).json(err);
    else res.json(count);
  });
});

module.exports = router;
