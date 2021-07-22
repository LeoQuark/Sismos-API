<<<<<<< Updated upstream
# Sismos-API
Implementación de un servicio de API REST, que recopila la informacion del sitio web de sismologia de la Universidad de Chile mediante el uso de web scraping.

## Clonar repositorio
En primera instancia debe clonar el repositorio mediante el uso de GIT. Debe ingresar el siguiente comando en la terminal:
- ```git clone https://github.com/LeoQuark/Sismos-API.git```

Una vez clonado el repositorio debe ingresar a la carpeta creada con el comando:
- ```cd ./Sismos-API```

Ahora debemos instalar los paquetes necesarios para correr el servidor, paquetes descritos en el archivo "package.json". Esto lo realizamos con el comando:
- ``` npm install ```

Al finalizar la instalación de todos paquetes requeridos, podemos correr el servidor con:
- ```npm run dev```

## Pruebas con POSTMAN
Para realizar una prueba del servicio de API REST, podemos emplear el software de Postman para realizar peticiones http sin la necesidad de tener construido un frontend o cliente.
Primero debemos descargar e instalar la herramienta desde la terminal con el siguiente comando
- ```sudo snap install postman```

#### Crear usuario
Una vez se descargado e instalado postman, podemos realizar las respectivas pruebas.
En primera instancia debe crearse un usuario para obtener la autenticación necesaria, ingresando una petición POST con la URL:
-``` "http://localhost:puerto/api/usuario/create"```
y mandando los datos (body) con el formato "raw", los datos deben ser; nombre,correo,password. Una vez enviada la petición obtenemos una confirmación por parte del servidor. 

#### Login o iniciar sesión para la autenticación
Debemos ingresar una petición POST a la URL:
-```"http://localhost:puerto/api/auth/login"```

mandando los datos por medio del body y el formato raw. Se deben enviar los datos de: correo y password. Al enviar la petición correctamente deberíamos obtener un login exitoso, junto con el token de Json Web Token obtenido en la respuesta a la petición.

#### Consultar los sismos 
Para consumir la API REST como tal y obtener los ultimos 15 sismos registrados mediante el scraping en nuestra base de datos. Debemos realizar una peticion GET a la URL:
-```"http://localhost:puerto/api/earthquakes"```

Ingresando el token (obtenido en la respuesta del login) en el apartado del "headers" como key=token y value=token del login. De esta forma nos autenticamos en esta fase de prueba y podemos realizar la petición GET. Obteniendo como respuesta el status de la petición y los sismos registrados.

--------
### No olvidar
Debemos tener PostgreSQL instalado en nuestro computador, además de crear la base de datos correspondiente a nuestro poryecto. Se recomienda ver el archivo de conexión entre bd y el servidor:
-```Sismos-API/src/database/connection.js ```

en dicho archivo se realiza la configuración de la conexión de la base de datos, donde se declara:

+ host.
+ user (usuario de postgre): se utuliza el usuario postgres predeterminado
+ password (contraseña del usuario de postgre) : 251100.
+ database (nombre de la base de datos): el nombre es "sismoschile" ,declarado en Sismos-API/sql/database.sql.
=======
# Sismos-API
Implementación de un servicio de API REST, que recopila la informacion del sitio web de sismologia de la Universidad de Chile mediante el uso de web scraping.

## Clonar repositorio
En primera instancia debe clonar el repositorio mediante el uso de GIT. Debe ingresar el siguiente comando en la terminal:
- ```git clone https://github.com/LeoQuark/Sismos-API.git```

Una vez clonado el repositorio debe ingresar a la carpeta creada con el comando:
- ```cd ./Sismos-API```

Ahora debemos instalar los paquetes necesarios para correr el servidor, paquetes descritos en el archivo "package.json". Esto lo realizamos con el comando:
- ``` npm install ```

Al finalizar la instalación de todos paquetes requeridos, podemos correr el servidor con:
- ```npm run dev```

## Pruebas con POSTMAN
Para realizar una prueba del servicio de API REST, podemos emplear el software de Postman para realizar peticiones http sin la necesidad de tener construido un frontend o cliente.
Primero debemos descargar e instalar la herramienta desde la terminal con el siguiente comando
- ```sudo snap install postman```

#### Crear usuario
Una vez se descargado e instalado postman, podemos realizar las respectivas pruebas.
En primera instancia debe crearse un usuario para obtener la autenticación necesaria, ingresando una petición POST con la URL:
-``` "http://localhost:puerto/api/usuario/create"```
y mandando los datos (body) con el formato "raw", los datos deben ser; nombre,correo,password. Una vez enviada la petición obtenemos una confirmación por parte del servidor. 

#### Login o iniciar sesión para la autenticación
Debemos ingresar una petición POST a la URL:
-```"http://localhost:puerto/api/auth/login"```

mandando los datos por medio del body y el formato raw. Se deben enviar los datos de: correo y password. Al enviar la petición correctamente deberíamos obtener un login exitoso, junto con el token de Json Web Token obtenido en la respuesta a la petición.

#### Consultar los sismos 
Para consumir la API REST como tal y obtener los ultimos 15 sismos registrados mediante el scraping en nuestra base de datos. Debemos realizar una peticion GET a la URL:
-```"http://localhost:puerto/api/earthquakes"```

Ingresando el token (obtenido en la respuesta del login) en el apartado del "headers" como key=token y value=token del login. De esta forma nos autenticamos en esta fase de prueba y podemos realizar la petición GET. Obteniendo como respuesta el status de la petición y los sismos registrados.

--------
### No olvidar
Debemos tener PostgreSQL instalado en nuestro computador, además de crear la base de datos correspondiente a nuestro poryecto. Se recomienda ver el archivo de conexión entre bd y el servidor:
-```Sismos-API/src/database/connection.js ```

en dicho archivo se realiza la configuración de la conexión de la base de datos, donde se declara:

+ host.
+ user (usuario de postgre): se utuliza el usuario postgres predeterminado
+ password (contraseña del usuario de postgre).
+ database (nombre de la base de datos): el nombre es "sismoschile" ,declarado en Sismos-API/sql/database.sql.
>>>>>>> Stashed changes
+ port (puerto por defecto de postgre -5432-).