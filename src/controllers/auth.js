import bcryptjs from "bcryptjs";
import generateJwt from "../helpers/generate-jwt.js";
import Pool from "../database/connection";

//Funcion sincronica para el login -> POST
export const login = async (req, res) => {
  const { correo, password } = req.body;

  //verificar si el correo existe el
  const user = await Pool.query("SELECT * FROM usuario WHERE correo=$1", [
    correo,
  ]);

  //Si no encuntra a ningun usuario asociado al correo
  if (user.rowCount == 0) {
    return res.status(400).json({
      msg: "Usuario / Password no son correctos - correo",
      status: false,
      typeError: "email",
    });
  }

  //Obtengo la contraseña del usuario asociado a dicho correo
  const passwordQuery = user.rows[0].password;

  //Verificar la contraseña del usuario (entrando, encriptada)
  const validPassword = bcryptjs.compareSync(password, passwordQuery);

  //Si las contraseñas comparadas no coinciden
  if (!validPassword) {
    return res.status(400).json({
      msg: "Usuario / Password no son correctos - password",
      status: false,
      typeError: "password",
    });
  }

  //Generar el JWT
  const token = await generateJwt(user.rows[0].id_usuario);

  res.status(200).json({
    user: user.rows[0],
    token,
  });
};

export default { login };
