//Helpers --> archivos con funciones que nos ayudarán a trabajar y mantener un codigo limpio y reutilizable
import Pool from "../database/connection";

//Verificar si el correo existe
export const isEmailValid = async (email = "") => {
  //Buscará si el email ya se encuentra en algun otra tabla admin
  const existeEmail = await Pool.query(
    "SELECT correo FROM usuario WHERE correo=$1",
    [email]
  );
  // console.log(existeEmail);
  if (existeEmail.rowCount != 0) {
    throw new Error(`El email ${email} ya se encuentra ocupado`);
  }
};

//Verificar si el id existe
export const existUserForId = async (id) => {
  //Buscará si el id ya se encuentra en algun otra tabla admin
  const existeUser = await Pool.query(
    "SELECT id_usuario FROM usuario WHERE id_usuario=$1",
    [id]
  );

  // console.log(existeUser)
  if (existeUser.rowCount == 0) {
    throw new Error(`El id ${id} no existe`);
  }
};

export default { isEmailValid, existUserForId };
