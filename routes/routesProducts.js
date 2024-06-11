import express from "express";
const { Router } = express;

import {
  actualizarProducto,
  eliminarProducto,
  crearProducto,
  getProducto,
  mostrarProductos,
  actualizarPrecios,
  bookProduct,
  buyProducts,
} from "../controllers/ProductControllers.js";

const routesProducts = Router();

routesProducts.put("/comprar", buyProducts);
routesProducts.put("/actualizarPrecios", actualizarPrecios);
routesProducts.get("/", mostrarProductos);
routesProducts.get("/:id", getProducto);
routesProducts.post("/", crearProducto);
routesProducts.put("/:id", actualizarProducto);
routesProducts.delete("/:id", eliminarProducto);
routesProducts.get("/book/:id", bookProduct);

export default routesProducts;
