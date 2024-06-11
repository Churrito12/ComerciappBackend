import express from "express";
import cors from "cors";
import db from "./database/db.js";
import routesUser from "./routes/routesUser.js";
import routesProducts from "./routes/routesProducts.js";
import pay from "./routes/pay.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/productos", routesProducts);
app.use("/users", routesUser);
app.use("/pay", pay);
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
