import db from "../database/db.js"; //Conectar a la base de datos

import { DataTypes } from "sequelize"; //Tipo de datos para cada atributo de la base de datos
//modelo de todos los productos
const ProductoModel = db.define("productos", {
  nombre: { type: DataTypes.STRING },
  precio: { type: DataTypes.DECIMAL },
  proveedor: { type: DataTypes.STRING },
  stockMax: { type: DataTypes.INTEGER },
  stockMin: { type: DataTypes.INTEGER },
  stock: { type: DataTypes.INTEGER },
});

export default ProductoModel;
