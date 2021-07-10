import { Router } from "express";
import { check } from "express-validator";
//Middlewares
import { validarCampos } from "../middlewares/validation";
import { validateJwt } from "../middlewares/validateJWT";
//Helpers
import { isEmailValid, existUserForId } from "../helpers/db-validators";
//Controllers
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/usuarioControllers";

//RUTAS
const router = Router();
//POST
router.post(
  "/create",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").isLength({ min: 5 }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(isEmailValid),
    validarCampos,
  ],
  createUser
);

//GET
router.get(
  "/get/:id",
  [check("id").custom(existUserForId), validarCampos],
  getUser
);

//UPDATE o PUT
//Valida si existe un token valido en el header de la peticion
router.put(
  "/update/:id",
  [validateJwt, check("id").custom(existUserForId), validarCampos],
  updateUser
);

//DELETE
//Valida si existe un token valido en el header de la peticion
router.delete(
  "/delete/:id",
  [
    //Validar que exista el token del usuario
    validateJwt,
    check("id").custom(existUserForId),
    validarCampos,
  ],
  deleteUser
);

export default router;
