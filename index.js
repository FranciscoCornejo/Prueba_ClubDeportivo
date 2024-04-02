//IMPLEMENTACION DEL SERVIDOR
import express from "express";
const app = express();
const port = process.env.port || 3000;

import router from "./routes/router.js";
import fs from "fs";
import path from "path";

app.use("/", router);

// Iniciar el servidor
app.listen(port, () =>
  console.log(`Servidor iniciado en el puerto http://localhost:${port}`)
);
//IMPLEMENTACION DEL SERVIDOR
