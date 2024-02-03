const db = require("../config/dbConfig.js");


const Item = {
  getAllItems: function (callback) {
    return db.query("SELECT * FROM Item", callback);
  },

  getItemById: function (id, callback) {
    return db.query("SELECT * FROM Item WHERE id = ?", [id], callback);
  },

  addItem: function (Item, callback) {
    return db.query(
      "INSERT INTO Item (product_id, quantity) values(?, ?)",
      [Item.product_id, Item.quantity],
      callback
    );
  },

  updateItem: function (id, Item, callback) {
    return db.query(
      "UPDATE Item SET product_id=?, quantity=? WHERE id=?",
      [Item.product_id, Item.quantity, id],
      callback
    );
  },

  deleteItem: function (id, callback) {
    return db.query("DELETE FROM Item WHERE id = ?", [id], callback);
  },
};

module.exports = Item;
