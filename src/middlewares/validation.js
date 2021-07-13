//Para realizar validaciones
import { validationResult } from "express-validator";

//Funcion que verifica la url de la peticion
export const validarURL = (req, res, next) => {
  const { url } = req;
  console.log(url);
  if (url.toString() != "/earthquakes") {
    res.status(404).json({
      status: "404 (No encontrado)",
      tipoMIME: "application/json",
      fecha: zonaLocal(),
      mensaje: "No existe la ruta indicada",
    });
  }
  next();
};

//Funcion extraida para validar campos de todas las rutas
//next() sirve para seguir con el siguiente controlador o middleware en caso de que no caiga en errores
export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "400 (Error)",
      tipoMIME: "application/json",
      fecha: zonaLocal(),
      mensaje: "Error en la petición",
    });
  }
  next();
};

export default { validarCampos, validarURL };
