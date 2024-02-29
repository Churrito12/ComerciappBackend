import express from "express";
import cors from "cors";
//Conexion a la base de datos
import db from "./database/db.js";
//importe el enrutador
import routes from "./routes/routes.js";

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
  res.send("Hola Mundo");
});
app.listen(8000, () => {
  console.log("Servidor corriendo en http.//localhost:8000/");
});
