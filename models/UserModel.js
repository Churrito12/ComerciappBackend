import db from "../database/db.js"; //Conectar a la base de datos

import { DataTypes } from "sequelize"; //Tipo de datos para cada atributo de la base de datos
//modelo de todos los productos
const UserModel = db.define("users", {
  user_name: { type: DataTypes.STRING },
  password: { type: DataTypes.DECIMAL },
});

export default UserModel;
