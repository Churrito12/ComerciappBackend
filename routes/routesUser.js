import express from "express";
import {
  mostrarUsuarios,
  crearUsuario,
  actualizarUsuario,
  obtenerUsuario,
} from "../controllers/UserController.js";
const routesUser = express.Router();

routesUser.get("/", mostrarUsuarios);
routesUser.get("/:id", obtenerUsuario);
routesUser.post("/", crearUsuario);
routesUser.put("/:id", actualizarUsuario);

export default routesUser;
