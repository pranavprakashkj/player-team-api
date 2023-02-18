const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sqlite::memory:", { logging: false });
// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "database.sql",
// });

export default sequelize;
