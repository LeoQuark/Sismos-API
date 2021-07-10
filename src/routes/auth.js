import { Router } from "express";
import { check } from "express-validator";
//Middlewares
import { validarCampos } from "../middlewares/validation";
//Controllers
import { login } from "../controllers/auth";

//RUTAS
const router = Router();

//POST
router.post(
  "/login",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

export default router;
