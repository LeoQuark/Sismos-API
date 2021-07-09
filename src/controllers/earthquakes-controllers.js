import puppeteer from "puppeteer";
import Pool from "../database/connection";

export const getSismos = async (req, res) => {
  try {
    //Inicio de puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://www.sismologia.cl/links/ultimos_sismos.html");

    const infoSismos = await page.evaluate(() => {
      //Obtengo el tbody de la tabla principal de sismos chile
      const tbody = document.querySelectorAll("table tbody");
      const sismos = [];

      //Recorro todos los nodos hijos (tr) del tbody (15 en total)
      for (let tr of tbody) {
        //Recorro los nodos hijos de cada tr, es decir, obtengo todos los td
        for (let i = 1; i < tr.childElementCount; i++) {
          //Declaro un objeto con los atributos necesarios
          const info = {
            fecha_local: "",
            fecha_utc: "",
            latitud: "",
            longitud: "",
            profundidad: "",
            magnitud: "",
            agencia: "",
            referencia_geografica: "",
          };

          //Asignación de los datos obtenidos al objeto
          info.fecha_local = tr.children[i].children[0].textContent;
          info.fecha_utc = tr.children[i].children[1].textContent;
          info.latitud = tr.children[i].children[2].textContent;
          info.longitud = tr.children[i].children[3].textContent;
          info.profundidad = tr.children[i].children[4].textContent;
          info.magnitud = tr.children[i].children[5].textContent;
          info.agencia = tr.children[i].children[6].textContent;
          info.referencia_geografica = tr.children[i].children[7].textContent;

          //Agrego cada objeto a un arreglo
          sismos.push(info);
        }
      }
      return sismos;
    });
    await browser.close();

    //Consulta de prueba, agrego el ultimo temblor registrado
    const consulta = await Pool.query(
      "INSERT INTO sismos (fecha_local,fecha_utc,latitud,longitud,profundidad,magnitud,agencia,referencia_geografica) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        infoSismos[0].fecha_local,
        infoSismos[0].fecha_utc,
        infoSismos[0].latitud,
        infoSismos[0].longitud,
        infoSismos[0].profundidad,
        infoSismos[0].magnitud,
        infoSismos[0].agencia,
        infoSismos[0].referencia_geografica,
      ]
    );

    if (consulta) {
      res.status(200).json({
        msg: "API funcionando",
        data: infoSismos[0],
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: error,
    });
  }
};
