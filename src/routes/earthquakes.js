import { Router } from "express";

//Controllers
import { getSismos } from "../controllers/earthquakes-controllers";

//Rutas
const router = Router();

//POST
//GET
router.get("/earthquakes", getSismos);

export default router;
