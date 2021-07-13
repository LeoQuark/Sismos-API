import Pool from "../database/connection";
import zonaLocal from "../helpers/fecha";

//Peticion para obtener los 15 primeros datos de la bd
export const getSismos = async (req, res) => {
  try {
    const consulta = await Pool.query(
      "SELECT fecha_local,latitud,longitud,profundidad,magnitud,referencia_geografica FROM sismos LIMIT 15"
    );

    if (consulta.rowCount != 0) {
      res.status(200).json({
        status: "200",
        tipoMIME: "application/json",
        data: consulta.rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(412).json({
      status: "412 (Precondición fallida)",
      tipoMIME: "application/json",
      fecha: zonaLocal(),
      mensaje: error,
    });
  }
};
