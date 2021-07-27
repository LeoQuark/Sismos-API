import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

//Rutas
import earthquakesRoutes from "./routes/earthquakes";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

//scrapping
import scrapping from "./controllers/scrapping";

//Automatización del scrapping cada 30 minutos
const tiempo = 5000;
setInterval(() => {
  scrapping();
}, tiempo);

//Variables ocultas .env
dotenv.config();

//Iniciar express
const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Headers para la api
app.use(cors());

//Rutas iniciales de la API
app.use("/grupo-m", earthquakesRoutes);
app.use("/grupo-m/auth", authRoutes);
app.use("/grupo-m/usuario", userRoutes);

//Se declara el puerto en el que correrá el servidor por medio de .env o asignandole por defecto el port:4000
const PORT = process.env.PORT || 18086;
//Se inicia el servidor en determinado puerto (port)
app.listen(PORT, () => {
  try {
    console.log(`PORT ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
