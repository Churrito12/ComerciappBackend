//importar modelo
import ProductoModel from "../models/ProductoModel.js";

//Metodos del CRUD

//Mostrar todos los registros
export const mostrarProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.findAll();
    res.json(productos);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar un registro
export const getProducto = async (req, res) => {
  try {
    const producto = ProductoModel.findOne({
      where: { id: req.params.id },
    });
    res.json(producto);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//crear un registro
export const crearProducto = async (req, res) => {
  try {
    await ProductoModel.create(req.body);
    res.json({
      message: "!Producto creado correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//actualizar un registro
export const actualizarProducto = async (req, res) => {
  try {
    await ProductoModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({
      message: "!Producto actualizado correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//eliminar un registro
export const eliminarProducto = async (req, res) => {
  try {
    await ProductoModel.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "!Producto eliminado correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
