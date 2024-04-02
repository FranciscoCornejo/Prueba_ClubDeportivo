//MODULARIZACION DE RUTAS SERL SERVIDOR IMPLEMENTADO
import express from "express";
const router = express.Router();
import path from "path";
const __dirname = import.meta.dirname;
import fs from "fs";

//CREAR RUTA QUE DISPONIBILICE EL ARCHIVO VISTA
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

//CREAR RUTA DEPORTES QUE APUNTA AL HTML QUE UN API LOCAL QUE DEVUELVE UN JSON
router.get("/deportes", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/data/data.json"));
});

//CREA RUTA PARA CREAR
router.get("/agregar", (req, res) => {
  //obtenemos los datos de la url
  const { nombre, precio } = req.query;
  //leemos el archivo
  const leerArchivo = fs.readFileSync("./assets/data/data.json");
  //desestrcuturamos el json para parsearlo
  const { deportes } = JSON.parse(leerArchivo);
  //agregamos el deporte
  deportes.push({ nombre, precio });
  //escribimos el archivo
  fs.writeFileSync("./assets/data/data.json", JSON.stringify({ deportes }));
  //mostramos un mensaje de exito
  res.send("deporte agregado");
});

//RUTA PARA EDITAR
router.get("/editar", (req, res) => {
  const { nombre, precio } = req.query;
  const leerArchivo = fs.readFileSync("./assets/data/data.json");
  let { deportes } = JSON.parse(leerArchivo);

  // Buscar el deporte por su nombre y actualizar el precio
  deportes.forEach((deporte) => {
    if (deporte.nombre === nombre) {
      deporte.precio = precio;
    }
  });

  // Escribir los deportes actualizados en el archivo JSON
  fs.writeFileSync("./assets/data/data.json", JSON.stringify({ deportes }));

  res.send(`Precio del deporte ${nombre} actualizado.`);
});

//RUTA PARA ELIMINAR
router.get("/eliminar", (req, res) => {
  const { nombre } = req.query;
  const leerArchivo = fs.readFileSync("./assets/data/data.json");
  let { deportes } = JSON.parse(leerArchivo);

  // Filtrar los deportes excluyendo el que se desea eliminar
  deportes = deportes.filter((deporte) => deporte.nombre !== nombre);

  // Escribir los deportes actualizados en el archivo JSON
  fs.writeFileSync("./assets/data/data.json", JSON.stringify({ deportes }));

  res.send(`${nombre} eliminado correctamente.`);
});

export default router;
//MODULARIZACION DE RUTAS SERL SERVIDOR IMPLEMENTADO
