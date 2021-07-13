import { Router } from "express";

//middleware
import { validateJwt } from "../middlewares/validateJWT";
import { validarURL } from "../middlewares/validation";
//Controllers
import { getSismos } from "../controllers/earthquakes-controllers";
//Rutas
const router = Router();

//GET
//Valida si existe un token valido en el header de la peticion
router.get("/earthquakes", validateJwt, getSismos);

export default router;
