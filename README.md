# Funko Store Online

Bienvenido a Funko Store Online, una tienda online de Funkos con una interfaz atractiva y características avanzadas. Este proyecto utiliza Angular para el frontend con librerías como SweetAlert2 para los alerts, ngx-spinner para los spinners y AOS para animaciones fluidas. En el backend, NodeJS es la tecnología principal, empleandose el framework Express, que ofrece características como manejo de rutas, middleware, plantillas, y gestión de errores para facilitar el desarrollo web con Node.js. Se integra ademas con Express Validator para validar datos del cliente, Bcrypt para el hash de contraseñas y Sequelize para mapear la base de datos MySQL.

## Instrucciones de Uso

### Frontend

1. **Instalación de Dependencias**
   Abra una terminal en la raíz del proyecto y ejecute:

   ```bash
   npm install

2. **Configuracion de la base de datos**
   En el archivo /server/data/db.js modifique los campos de user, password y database con los datos de su base de datos MySQL.  

3. **Iniciar el Servidor Front End**
    Inicie el servidor de desarrollo ejecutando:

    npm start

El servidor de desarrollo se iniciará en http://localhost:4200/

4. **Migraciones**
   Para crear las tablas de la base de datos, ejecute:

   ```bash
   npx sequelize-cli db:migrate

5. **Iniciar el Servidor Back End**
   Abra una terminal en la carpeta server y ejecute:

   ```bash
   npm install

   npm run dev

El servidor de desarrollo se iniciará en http://localhost:3000/

6. **Registro de usuario**

    Para comenzar, registre un nuevo usuario a través de la interfaz. Este usuario puede ser promocionado a administrador si modifica el atributo isAdmin a true directamente en la base de datos.
    Como administrador tendra acceso a la seccion de administracion, donde podra crear, editar y eliminar productos.

7. **Iniciar Sesión**
    
        Inicie sesión con el usuario creado en el paso anterior. Si el usuario es administrador, podrá acceder a la sección de administración.

8. **Realizar Compra**

    Para realizar una compra, seleccione un producto y agreguelo al carrito. Luego, dirijase al carrito y complete los datos de envio. Finalmente, confirme la compra y se le redirigirá a la sección de compras, donde podrá ver el estado de sus compras.

9. **Ver Compras**

    Para ver el estado de sus compras, dirijase a la sección de compras. Allí podrá ver el estado de sus compras. En caso de no estar logueado igualmente podra ver el estado de su carrito, ya que se almacena en el local storage.

    