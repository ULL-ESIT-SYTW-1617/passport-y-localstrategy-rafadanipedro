# Práctica: Passport y LocalStrategy. Práctica 8 de SYTW

[![Version NPM](https://img.shields.io/npm/v/plugin-iaas-passport-rafadanipedro.svg)](https://www.npmjs.com/package/plugin-iaas-passport-rafadanipedro)

## Tutorial paso a paso

### Tutorial autenticación LocalStrategy

Lo primero que debemos de hacer es instalar el plugin usando el paquete [gitbook-start-github-rafadanipedro](https://www.npmjs.com/package/gitbook-start-github-rafadanipedro)

Para usarlo, ejecutamos el siguiente comando:
`gitbook-start --deploy="plugin-passport-passport-rafadanipedro"`

Al instalar, se irá preguntando la configuración, por ejemplo:

```
? Cual es tu username del Iaas: rafa
? Cual es la ruta de tu clave privada: ~/.ssh/id_rsa
? Cual es el directorio del Iaas: /home/rafa/miProyecto
? Cual es tu direccion ip: 95.122.54.178
? ¿De que manera quieres autenticarte?:
- [ ] Github
- [X] Local
? Escribe los correos separados por comas (alguien@algo.com, otro@algo.com)
? Entre en esta direccion para crear una OauthApplication enDropbox https://www.dropbox.com/developers/apps y escribe "confirmar" para continuar
? ¿Cual es el token generado?

```
Una vez hecho esto, el plugin desplegará un servidor de Express en la IP configurada. Además, se añadirán las tareas correspondintes a tu `gulpfile.js`.
Intenta navegar a la IP de tu máquina, debería decirte que tienes que desplegar el libro.
Ahora despliega con `gulp IaasPassportRafadanipedro`, y debería desplegar tu libro en la máquina remota.

#### Generar token con Dropbox

Para que podamos almacenar los datos de los usuarios, usaremos Dropbox. Para ello, necesitamos generar un token que nos proporcione acceso. Primero, entramos a https://www.dropbox.com/developers/apps, creamos una nueva aplicación y generamos un token. Los pasos serían los siguientes:

1. Create App  
2. Dropbox Api  
3. App folder  
4. Nombre de la aplicación

Una vez creada la aplicación, el menú que se nos abre, bajamos hasta el apartado de `OAuth 2` y en la opción `Generated access token` le damos al botón `Generate` y copiamos el token que allí nos aparece para introducirlo posteriormente en la terminal.

#### Uso con LocalStrategy
En el caso de utilizar el registro con LocalStrategy, se nos creará por defecto un archivo `db.json` en el cuál contendrá los correos introducidos en la terminal y las contraseñas cifradas, las cuales son por defecto `1234`.

La primera vez que iniciemos sesión, se requerirá que el usuario cambie la contraseña, ya que no admitimos `1234` como contraseña. Una vez cambiada, deberemos cerrar sesión accediendo a `/logout`. A continuación, ya podremos iniciar sesión sin problemas


### Tutorial autenticación con Github

Lo primero que debemos de hacer es instalar el plugin usando el paquete [gitbook-start-github-rafadanipedro](https://www.npmjs.com/package/gitbook-start-github-rafadanipedro)

Para usarlo, ejecutamos el siguiente comando: `gitbook-start --deploy="plugin-iaas-oauth-rafadanipedro"`

Al instalar, se irá preguntando la configuración, por ejemplo:
```
? Cual es tu username del Iaas: rafa
? Cual es la ruta de tu clave privada: ~/.ssh/id_rsa
? Cual es el directorio del Iaas: /home/rafa/miProyecto
? Cual es tu direccion ip: 95.122.54.178
? ¿De que manera quieres autenticarte?:
- [X] Github
- [ ] Local
? Entre en esta direccion para crear una OauthApplication en Github https://github.com/settings/developers y escribe "confirmar" para continuar: confirmar
? Cual es el clientID:
? Cual es el clientSecret:
? Cual es la organizacion a la que perteneces: ULL-ESIT-GRADOII-DSI
```

Una vez hecho esto, el plugin desplegará un servidor de Express en la IP configurada. Además, se añadirán las tareas correspondintes a tu `gulpfile.js`.
Intenta navegar a la IP de tu máquina, debería decirte que tienes que desplegar el libro.
Ahora despliega con `gulp IaasPassportRafadanipedro`, y debería desplegar tu libro en la máquina remota.

#### Configurar claves ssh
Primero, generaremos un par de claves ssh para poder acceder a nuestro servidor sin necesidad de poner contraseña. Lo haremos con:
- `ssh-keygen -t rsa -b 2048`

Presionamos enter hasta que termine, puesto que no nos interesa cambiar los parámetros por defecto. Ahora copiamos nuestra clave en el servidor con:
- `ssh-copy-id usuario@direccion-servidor-iaas`

#### Instalación de paquetes necesarios
Para poder correr nuestro libro correctamente, tenemos que tener instalado en nuestra máquina Node.js y `npm`. En el caso del [IAAS ULL](https://iaas.ull.es), esto ya viene instalado por defecto, pero por si queremos utilizarlo en otro servidor, estos son los pasos a seguir:

1. Instalamos `nvm`, que nos permite instalar la versión que queramos de Node.js. Seguimos los pasos descritos en la sección de `Install script` del README del [repositorio de nvm](https://github.com/creationix/nvm).
2. Una vez instalado `nvm`, ejecutamos el comando `nvm install node` para instalar la última versión disponible de Node.js.

Al instalar Node.js, `npm` ya se encuentra por defecto.

#### Tutorial para crear una OauthApplication

Para permitir que una aplicación web pueda acceder a la plataforma Github, hay que darle un permiso de authenticación Oauth. Para conseguirlo se debe ingresar en el siguiente enlace:
[Enlace Oauth](https://github.com/settings/developers).

Para realizar la aplicación, se deben realizar una serie de pasos:

* Registrar la nueva aplicación.

![OauthApplication](https://s16.postimg.org/uho7li4hh/captura_enlace_oauth.png)

![Registrar nueva app](https://s16.postimg.org/d1pg62g51/captura_boton_registrar_app.png)

* Una vez se accede al menú de registro de nueva aplicación, se debe añadir un nombre a a la aplicación.

![Añadir descripcion](https://s16.postimg.org/ofbzh9qnp/captura_creacion_app.png)
* A continuación, se debe añadir el enlace de la aplicación principal.El enlace debe tener el siguiente formato: `http(s)://hostname`
* Finalmente, se añade una pequeña descripción a la aplicación creada y se le añade la authorization callback url que debe tener el siguiente formato: `http(s)://hostname/auth/github_oauth/callback`
* Cuando la aplicación ya ha sido creada, se puede acceder a la misma y utilizar el clientId y el clientSecret para poder realizar la autenticación mediante Oauth.

## Descripción de la práctica
 * [Gitbook de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicapassport.html)

## Páginas personales

Pinchando sobre las imágenes podrás acceder a nuestras páginas personales.

<a href='https://rafaherrero.github.io' target='_blank'><img src='https://avatars2.githubusercontent.com/u/11819652?v=3&s=400' border='0' alt='postimage' width='100px'/></a> <a href='https://danielramosacosta.github.io/' target='_blank'><img src='https://avatars2.githubusercontent.com/u/11427028?v=3&s=400' border='0' alt='postimage' width='100px'/></a> <a href='https://alu0100505078.github.io/' target='_blank'><img src='https://avatars3.githubusercontent.com/u/14938442?v=3&s=400' border='0' alt='postimage' width='100px'/></a>
