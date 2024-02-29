import db from "../database/db.js";

import { DataTypes } from "sequelize";

const ProductoModel = db.define("productos", {
  nombre: { type: DataTypes.STRING },
  precio: { type: DataTypes.DECIMAL },
  proveedor: { type: DataTypes.STRING },
  stock: { type: DataTypes.INTEGER },
});

export default ProductoModel;
