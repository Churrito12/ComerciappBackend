import { Sequelize } from "sequelize";

const db = new Sequelize("database_app", "root", "labrava12", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
