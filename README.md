# Funko Store Online

Bienvenido a Funko Store Online, una tienda online de Funkos con una interfaz atractiva y características avanzadas. Este proyecto utiliza Angular para el frontend con librerías como SweetAlert2 para los alerts, ngx-spinner para los spinners y AOS para animaciones fluidas. En el backend, NodeJS es la tecnología principal, empleandose el framework Express, que ofrece características como manejo de rutas, middleware, plantillas, y gestión de errores para facilitar el desarrollo web con Node.js. Se integra ademas con Express Validator para validar datos del cliente, Bcrypt para el hash de contraseñas y Sequelize para mapear la base de datos MySQL.

## Configuración Inicial

### Configuración del Backend

1. **Archivo `.env`**
   Genere un archivo `.env` dentro de la carpeta `server` con las siguientes variables (reemplazando los valores según su configuración):

   ```env
   DB_USERNAME=root
   DB_PASSWORD=su_contraseña
   DB_DATABASE=funkostore
   DB_HOST=127.0.0.1
   DB_DIALECT=mysql
   JWT_SECRET=su_secreto
   ```

2. **Archivo `config.json`**
   Genere un archivo `config.json` dentro de una carpeta `config` dentro de `server` con la siguiente estructura (reemplace las variables según su configuración):

   ```json
   {
     "development": {
       "username": "root",
       "password": "su_contraseña",
       "database": "funkostore",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "test": {
       "username": "root",
       "password": "su_contraseña",
       "database": "database_test",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "production": {
       "username": "root",
       "password": "su_contraseña",
       "database": "database_production",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

### Migraciones de la Base de Datos

Ejecute el siguiente comando para crear las tablas en la base de datos:

```bash
npx sequelize-cli db:migrate
```

## Instrucciones de Uso

### Frontend

1. **Instalación de Dependencias**
   Abra una terminal en la raíz del proyecto y ejecute:

   ```bash
   npm install
   ```

2. **Iniciar el Servidor Front End**
    Inicie el servidor de desarrollo ejecutando:

   ```bash
   npm start
   ```

   El servidor de desarrollo se iniciará en <http://localhost:4200/>

### Backend

1. **Instalación de Dependencias**
   Abra una terminal en la carpeta `server` y ejecute:

   ```bash
   npm install
   ```

2. **Iniciar el Servidor Back End**
   Ejecute el siguiente comando:

   ```bash
   npm run dev
   ```

   El servidor de desarrollo se iniciará en <http://localhost:3000/>

### Funcionalidades

1. **Registro de Usuario**

    Para comenzar, registre un nuevo usuario a través de la interfaz. Este usuario puede ser promocionado a administrador si modifica el atributo `isAdmin` a `true` directamente en la base de datos.

2. **Iniciar Sesión**

    Inicie sesión con el usuario creado en el paso anterior. Si el usuario es administrador, podrá acceder a la sección de administración.

3. **Realizar Compra**

    Para realizar una compra, seleccione un producto y agréguelo al carrito. Luego, diríjase al carrito y complete los datos de envío. Finalmente, confirme la compra y se le redirigirá a la sección de compras, donde podrá ver el estado de sus compras.

4. **Ver Compras**

    Para ver el estado de sus compras, diríjase a la sección de compras. Allí podrá ver el estado de sus compras. En caso de no estar logueado, igualmente podrá ver el estado de su carrito, ya que se almacena en el local storage.
    
