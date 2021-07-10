import jwt from "jsonwebtoken";
/* 
  Un jwt esta conformado por 
    header => algoritmo de encriptacion
    payload => informacion en formato json (data)
    verificador 
*/
export const generateJwt = async (id = "") => {
  //Retorno una nueva promesa (dado que se usará await cuando se llame esta funcion)
  return new Promise((resolve, reject) => {
    //Obtenemos el user id o uid
    const payload = { id };

    //sign => genera el jwt con los argumentos (datos=payload,key (.env), object(expiresIn),promise)
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateJwt;
