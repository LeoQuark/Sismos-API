//Para realizar validaciones
import { validationResult } from "express-validator";

//Funcion extraida para validar campos de todas las rutas
//next() sirve para seguir con el siguiente controlador o middleware en caso de que no caiga en errores
export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors,
    });
  }

  next();
};

export default validarCampos;
