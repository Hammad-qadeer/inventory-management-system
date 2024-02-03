const db = require("../config/dbConfig.js");



const Products = {
  getAllProducts: function (callback) {
    return db.query("SELECT * FROM Product", callback);
  },

  getProductById: function (id, callback) {
    return db.query("SELECT * FROM Product WHERE id = ?", [id], callback);
  },

  addProduct: function (Product, callback) {
    return db.query(
      "INSERT INTO Product (name, category_id) values(?, ?)",
      [Product.name, Product.category_id],
      callback
    );
  },

  updateProduct: function (id, Product, callback) {
    return db.query(
      "UPDATE Product SET name=?, category_id=? WHERE id=?",
      [Product.name, Product.category_id, id],
      callback
    );
  },

  deleteProduct: function (id, callback) {
    return db.query("DELETE FROM Product WHERE id = ?", [id], callback);
  },
};

module.exports = Products;
