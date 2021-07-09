import cheerio from "cheerio";
import request from "request-promise";
import Pool from "../database/connection";

export const getSismos = async (req, res) => {
  try {
    const objeto = [];
    const $ = await request({
      //uri: 'http://www.sismologia.cl/events/sensibles/2021/07/08-2342-55L.S202107.html',
      uri: "http://www.sismologia.cl/links/ultimos_sismos.html",
      transform: (body) => cheerio.load(body),
    });

    $("tbody tr")
      .next()
      .each((i, el) => {
        const sismos = [];

        let aux = {
          fecha_local: "",
          fecha_utc: "",
          latitud: "",
          longitud: "",
          profundidad: "",
          magnitud: "",
          agencia: "",
          referencia_geografica: "",
        };
        $(el)
          .find("td")
          .each((j, il) => {
            if (j == 0) {
              const text = $(el).find("a");
              sismos.push(text.html());
              //console.log(j,text.html());
            } else {
              sismos.push($(il).html());

              //console.log(j, $(il).html());
            }
          });

        aux.fecha_local = sismos[0];
        aux.fecha_utc = sismos[1];
        aux.latitud = sismos[2];
        aux.longitud = sismos[3];
        aux.profundidad = sismos[4];
        aux.magnitud = sismos[5];
        aux.agencia = sismos[6];
        aux.referencia_geografica = sismos[7];

        objeto.push(aux);
      });

    //Consulta de prueba, agrego el ultimo temblor registrado
    // const consulta = await Pool.query(
    //   "INSERT INTO sismos (fecha_local,fecha_utc,latitud,longitud,profundidad,magnitud,agencia,referencia_geografica) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
    //   [
    //     infoSismos[0].fecha_local,
    //     infoSismos[0].fecha_utc,
    //     infoSismos[0].latitud,
    //     infoSismos[0].longitud,
    //     infoSismos[0].profundidad,
    //     infoSismos[0].magnitud,
    //     infoSismos[0].agencia,
    //     infoSismos[0].referencia_geografica,
    //   ]
    // );

    res.status(200).json({
      msg: "API funcionando",
      data: objeto,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: error,
    });
  }
};
