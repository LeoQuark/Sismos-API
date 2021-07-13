import jwt from "jsonwebtoken";
import Pool from "../database/connection";
import zonaLocal from "../helpers/fecha";

export const validateJwt = async (req, res, next) => {
  //Obtengo el token del header
  const token = req.header("token");

  //Caso de que no se haya enviado el token
  if (!token) {
    return res.status(401).json({
      status: "401 (Sin autorización)",
      tipoMIME: "application/json",
      fecha: zonaLocal(),
      mensaje: "No hay token en la petición",
    });
  }

  try {
    //Verificamos que el token sea el mismo, pasandole el secret or private key. Si es correcto el token nos retornara el payload que contiene {uid,iat(creacion),exp(expiracion)}
    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Al tener un verify exitoso, pasamos al request el uid. Este req seguirá pasando por los middlewares hasta llegar al controlador del usuario
    //req.uid = uid;

    const userAuth = await Pool.query(
      "SELECT * FROM usuario WHERE id_usuario=$1",
      [id]
    );
    // const userAuth = await User.findById(uid);
    // console.log(userAuth);
    //Verifico si el usuario auth existe
    if (userAuth.rowCount == 0) {
      return res.status(403).json({
        status: "403 (Sin permiso)",
        tipoMIME: "application/json",
        fecha: zonaLocal(),
        mensaje: "Usuario no existe en BD",
      });
    }

    req.user = userAuth.rows[0];

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "401 (Sin autorización)",
      tipoMIME: "application/json",
      fecha: zonaLocal(),
      mensaje: "Token no valido",
    });
  }
};

export default validateJwt;
