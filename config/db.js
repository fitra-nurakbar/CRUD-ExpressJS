const sequelize = require("sequelize");

const db = new sequelize("crudnodejs", "udacoding", "123123", {
  dialect: "mysql",
});

db.sync({});

module.exports = db;