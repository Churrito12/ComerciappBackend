import express from "express";
const { Router } = express;

import {
  actualizarProducto,
  eliminarProducto,
  crearProducto,
  getProducto,
  mostrarProductos,
} from "../controllers/ProductControllers.js";

const router = Router();

router.get("/", mostrarProductos);
router.get("/:id", getProducto);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
