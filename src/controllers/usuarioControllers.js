import Pool from "../database/connection";
import bcryptjs from "bcryptjs";

//Funcion para crear un usuario
export const createUser = async (req, res) => {
  const { nombre, correo, password } = req.body;
  try {
    //Encriptar la contraseña
    const saltos = bcryptjs.genSaltSync();
    const passEncrypted = bcryptjs.hashSync(password, saltos);

    //Insert a la bd del nuevo usuario
    const consulta = await Pool.query(
      "INSERT INTO usuario (nombre,correo,password) VALUES ($1,$2,$3)",
      [nombre, correo, passEncrypted]
    );

    if (consulta) {
      res.status(200).json({
        msg: `Usuario creado correctamente`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion que obtiene el usuario por medio de su id
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await Pool.query(
      "SELECT * FROM usuario WHERE id_usuario = $1",
      [id]
    );

    //datos de la respuesta de la consulta anterior
    const respuesta = consulta.rows[0];

    if (consulta) {
      res.status(200).json({
        data: {
          id_usuario: respuesta.id_usuario,
          nombre: respuesta.nombre,
          correo: respuesta.correo,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion que actuliza la información del usuario a partir de su id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, password } = req.body;
  try {
    //Encriptar la contraseña
    const saltos = bcryptjs.genSaltSync();
    const passEncrypted = bcryptjs.hashSync(password, saltos);

    const consulta = await Pool.query(
      "UPDATE usuario SET nombre=$1, correo=$2, password=$3 WHERE id_usuario=$4",
      [nombre, correo, passEncrypted, id]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El usuario ${nombre} ha sido actualizado`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

// Funcion que elimina de la bd un usuario a partir de su id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const consultaNombre = await Pool.query(
      "SELECT nombre FROM usuario WHERE id_usuario=$1",
      [id]
    );
    const consulta = await Pool.query(
      "DELETE FROM usuario WHERE id_usuario=$1",
      [id]
    );

    if (consulta) {
      res.status(200).json({
        msg: `El usuario ${consultaNombre.rows[0].nombre} ha sido eliminado de la BD`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
