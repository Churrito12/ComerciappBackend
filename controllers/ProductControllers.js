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
    const producto = await ProductoModel.findOne({
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
//actualizar precios
export const actualizarPrecios = async (req, res) => {
  try {
    const { porcentajeAumento } = req.body;

    if (
      !porcentajeAumento ||
      isNaN(porcentajeAumento) ||
      porcentajeAumento <= 0
    ) {
      return res
        .status(400)
        .json({ message: "Porcentaje de aumento inválido" });
    }

    const productos = await ProductoModel.findAll();

    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      const nuevoPrecio = producto.precio * (1 + porcentajeAumento / 100);

      await ProductoModel.update(
        { precio: nuevoPrecio },
        {
          where: { id: producto.id },
        }
      );
    }

    res.json({
      message: "Precios actualizados correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const bookProduct = async (req, res) => {
  try {
    console.log(productosStock);
    if (req.query.f === "unbook") {
      productosStock[req.params.id]++;
      return res.json("unbooked");
    } else if (req.params.id === "book") {
      if (productosStock[req.params.id] == 0) return res.json("Stockout");
      productosStock[req.params.id]--;
      return res.json("booked");
    }
    res.status(400).json("error");
  } catch (error) {
    res.json({ message: error.message });
  }
};
//Funcion al comprar, activa uptadecontent
export const buyProducts = async (req, res) => {
  try {
    console.log(typeof req.body);
    const promises = Object.keys(req.body).map((producto) =>
      updateContent(producto, req.body[producto])
    );

    await Promise.all(promises);

    res.json("Compra realizada correctamente");
  } catch (error) {
    console.error("Error al comprar productos:", error);
    res.status(500).json({ message: error.message });
  }
};

//Actualizar el stock
export const updateContent = async (producto, quantity) => {
  console.log(producto);
  try {
    const stock = await ProductoModel.findAll({
      attributes: ["id", "stock"],
      where: { id: producto },
    });

    const newStock = stock[0].dataValues.stock - quantity;

    await ProductoModel.update(
      { stock: newStock },
      { where: { id: producto } }
    );

    if (productoMinStock[producto].stockMin >= newStock) {
      sendMail({ id: producto });
    }

    return { message: "Stock actualizado correctamente" };
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
    throw new Error("Error al actualizar el stock");
  }
};
