import express from "express";
import cors from "cors";
import db from "./database/db.js";
import ProductoModel from "./models/ProductoModel.js";
import routesUser from "./routes/routesUser.js";
import routesProducts from "./routes/routesProducts.js";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-7261017348869659-050818-cf9a4e855da8d02cfc11dbab6baf5d80-309670165",
});

const app = express();

app.use(cors());
app.use(express.json());
app.use("/productos", routesProducts);
app.use("/users", routesUser);

try {
  await db.authenticate();
  console.log("Conexion exitosa a la base de datos");
} catch (error) {
  console.log(`Conexion fracasada, el error es:${error}`);
}
app.get("/", (req, res) => {
  res.send("Holis");
});

app.post("/payment", async (req, res) => {
  console.log(req, "respuesta");
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:5173/cart",
        failure: "http://localhost:5173/cart",
        pending: "http://localhost:5173/cart",
      },
      auto_return: "approved",
    };
    console.log(body, "body");
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error del servidor",
    });
  }
});

const productos = await ProductoModel.findAll({
  attributes: ["id", "stock", "stockMin", "nombre"],
});
let productoMinStock = {};
let productosStock = {};

productos.forEach((producto) => {
  productosStock[producto.dataValues.id] = producto.dataValues.stock;
});
productos.forEach((producto) => {
  productoMinStock[producto.dataValues.id] = {
    stockMin: producto.dataValues.stockMin,
    nombre: producto.dataValues.nombre,
  };
});
app.listen(8000, () => {
  console.log("Servidor corriendo en http://localhost:8000/");
});
export { productosStock, productoMinStock };
