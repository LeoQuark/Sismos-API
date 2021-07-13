import Pool from "../database/connection";
import cheerio from "cheerio";
import request from "request-promise";

export const scrapping = async () => {
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

    const Ingresobase = await Pool.query(
      "SELECT fecha_local FROM sismos ORDER BY id_sismo DESC limit 1"
    );
    if (Ingresobase.rowCount != 0) {
      //Si Ingresobase.rows es undefined indica que la tabla está vacía, entonces se omite este paso
      const fecha = Ingresobase.rows[0].fecha_local; //Guardado en variable de la fecha del ultimo sismo registrado en la BD
      for (var j = 0; j < objeto.length; j++) {
        if (objeto[j].fecha_local === fecha) {
          while (objeto.length != j) {
            //Se eliminan los datos que ya se encuentran en la BD para que no se agreguen, de esta forma se agregan los más recientes al ultimo registrado
            objeto.pop();
          }
        }
      }
    }
    //Consulta de prueba, agrego el ultimo temblor registrado
    if (objeto.length != 0) {
      //Si el arreglo tiene algun registro que no está en la base de datos se agrega
      for (var i = objeto.length - 1; i >= 0; i--) {
        const consulta = await Pool.query(
          "INSERT INTO sismos (fecha_local,fecha_utc,latitud,longitud,profundidad,magnitud,agencia,referencia_geografica) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
          [
            objeto[i].fecha_local,
            objeto[i].fecha_utc,
            objeto[i].latitud,
            objeto[i].longitud,
            objeto[i].profundidad,
            objeto[i].magnitud,
            objeto[i].agencia,
            objeto[i].referencia_geografica,
          ]
        );
      }
    } else {
      objeto[0] = "Nada que agregar";
    }
  } catch (error) {
    console.log(error);
    console.log("error al realizar el scrapping a sismologia.cl");
  }
};

export default scrapping;
