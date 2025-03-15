# Funko Store Online

Bienvenido a Funko Store Online, una tienda online de Funkos con una interfaz atractiva y características avanzadas. Este proyecto utiliza Angular para el frontend con librerías como SweetAlert2 para los alerts, ngx-spinner para los spinners y AOS para animaciones fluidas. En el backend, NodeJS es la tecnología principal, empleándose el framework Express, que ofrece características como manejo de rutas, middleware, plantillas y gestión de errores para facilitar el desarrollo web con Node.js. Se integra además con Express Validator para validar datos del cliente, Bcrypt para el hash de contraseñas y Sequelize para mapear la base de datos MySQL.

---

## Instrucciones de Uso

### Frontend

1. **Instalación de Dependencias**  
   Abra una terminal en la raíz del proyecto y ejecute:  
   `npm install`

   **Configuración de las Variables de Entorno**  
   Cree un archivo `.env` en la raíz del proyecto y agregue las siguientes variables de entorno:

   ```plaintext
   DB_NAME=nombre_de_la_base_de_datos
   DB_USER=usuario_de_la_base_de_datos
   DB_PASSWORD=contraseña_de_la_base_de_datos
   DB_HOST=nombre_del_host_de_la_base_de_datos
   DB_PORT=puerto_de_la_base_de_datos
   ```

   **Configuración de la Base de Datos**  
   En el archivo `/server/data/db.js`, modifique los campos de dialect y schema si corresponde, según su base de datos.

   **Crear las Tablas de la Base de Datos**  
   Para crear las tablas, ejecute los comandos de migración en la terminal desde la carpeta server con:

   `npx sequelize-cli db:migrate`

   **Iniciar el Servidor Frontend**  
   Inicie el servidor de desarrollo ejecutando:

   `npm start`  
   El servidor de desarrollo se iniciará en http://localhost:4200/.

### Backend

1. **Instalación de Dependencias**  
   Abra una terminal en la carpeta server y ejecute:

   `npm install`

   **Iniciar el Servidor Backend**  
   Ejecute el siguiente comando:

   `npm run dev`  
   El servidor de desarrollo se iniciará en http://localhost:3000/

   **Importar Datos de Funkos**  
   Para importar los datos desde el archivo JSON a las tablas de la base de datos, ejecute el script `importFunkos.js`. Asegúrese de que su terminal esté en la carpeta server y ejecute:

   `node ./scripts/importFunkos.js`

### Funcionalidades

1. **Registro de Usuario**  
   Para comenzar, registre un nuevo usuario a través de la interfaz. Este usuario puede ser promocionado a administrador modificando el atributo `isAdmin` a `true` directamente en la base de datos. Como administrador, tendrá acceso a la sección de administración, donde podrá crear, editar y eliminar productos.

2. **Iniciar Sesión**  
   Inicie sesión con el usuario creado en el paso anterior. Si el usuario es administrador, podrá acceder a la sección de administración.

3. **Realizar Compras**  
   Para realizar una compra, seleccione un producto y agréguelo al carrito. Luego, diríjase al carrito, complete los datos de envío y confirme la compra. Se le redirigirá a la sección de compras, donde podrá ver el estado de sus compras.

4. **Ver Compras**  
   Para ver el estado de sus compras, diríjase a la sección de compras. Allí podrá ver el estado de sus compras. En caso de no estar logueado, igualmente podrá ver el estado de su carrito, ya que se almacena en el localStorage.
