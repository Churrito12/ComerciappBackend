import express from "express";
import cors from "cors";
//Conexion a la base de datos
import db from "./database/db.js";
//importe el enrutador
import routes from "./routes/routesProducts.js";
// import ProductoModel from "./models/ProductoModel.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/productos", routes);

try {
  await db.authenticate();
  console.log("Conexion exitosa a la base de datos");
} catch (error) {
  console.log(`Conexion fracasada, el error es:${error}`);
}
app.get("/", (req, res) => {
  res.send("Holis");
});
app.listen(8000, () => {
  console.log("Servidor corriendo en http://localhost:8000/");
});

// const productos = await ProductoModel.findAll({
//   attributes: ["id", "stock", "stockMin", "nombre"],
// });
// let productoMinStock = {};
// let productosStock = {};

// productos.forEach((producto) => {
//   productosStock[producto.dataValues.id] = producto.dataValues.stock;
// });
// productos.forEach((producto) => {
//   productoMinStock[producto.dataValues.id] = {
//     stockMin: producto.dataValues.stockMin,
//     nombre: producto.dataValues.nombre,
//   };
// });
// console.log(productoMinStock);
// export { productosStock, productoMinStock };
