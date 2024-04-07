//importar modelo
import UserModel from "../models/UserModel.js";

//Metodos del CRUD

//Mostrar todos los usuario
export const mostrarUsuarios = async (req, res) => {
  try {
    const Users = await UserModel.findAll();
    res.json(Users);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//crear un usuario
export const crearUsuario = async (req, res) => {
  try {
    await UserModel.create(req.body);
    res.json({
      message: "!Usuario creado correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//actualizar un registro
export const actualizarUsuario = async (req, res) => {
  try {
    await UserModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({
      message: "!Usuario actualizado correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
