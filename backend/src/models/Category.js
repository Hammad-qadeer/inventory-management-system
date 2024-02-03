const db = require("../config/dbConfig.js");

const Category = {
  getAllCategories: function (callback) {
    return db.query("SELECT * FROM Category", callback);
  },

  getCategoryById: function (id, callback) {
    return db.query("SELECT * FROM Category WHERE id = ?", [id], callback);
  },

  addCategory: function (Category, callback) {
    return db.query(
      "INSERT INTO Category (name) values(?)",
      [Category.name],
      callback
    );
  },

  updateCategory: function (id, Category, callback) {
    return db.query(
      "UPDATE Category SET name=? WHERE id=?",
      [Category.name, id],
      callback
    );
  },

  deleteCategory: function (id, callback) {
    return db.query("DELETE FROM Category WHERE id = ?", [id], callback);
  },
};



module.exports = Category;
