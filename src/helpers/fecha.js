export default function zonaLocal() {
  const date = new Date();
  const fecha = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const zonaLocal = `${fecha} ${hora}`;
  return zonaLocal;
}
