import express from "express";
const { Router } = express;

import {
  actualizarProducto,
  eliminarProducto,
  crearProducto,
  getProducto,
  mostrarProductos,
  actualizarPrecios,
  // bookProduct,
  // buyProducts,
} from "../controllers/ProductControllers.js";

const router = Router();

router.put("/actualizarPrecios", actualizarPrecios);
router.get("/", mostrarProductos);
router.get("/:id", getProducto);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);
// router.get("/book/:id", bookProduct);
// router.put("comprar", buyProducts);

export default router;
