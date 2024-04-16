const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const db = require('./data/db');
const funkoRoutes = require('./src/routes/funkoRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const cartRoutes = require('./src/routes/cartRoutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Servir archivos estáticos desde la carpeta 'dist', en la raíz del sitio
app.use(express.static(__dirname + '/dist/funko-store'));

// Configuración básica de CORS permitiendo solicitudes desde http://localhost:4200
app.use(cors({
    // origin: 'http://localhost:4200',
    "origin": "*",
    credentials: true
  }));

// const secretKey = crypto.randomBytes(32).toString('hex');
const secretKey = 'secretKey';

app.use(session({
    secret : secretKey,
    resave : false,
    saveUninitialized : false,
}));

const conexionDB = async ()=> {
    try{
        await db.authenticate();
        console.log("conexion exitosa");
    }catch(error){
        console.log(error);
    }
}

app.listen(port, () => {
    conexionDB();
    console.log(`API_BACK listening at http://localhost:${port}`);
});

app.use ('/fk', funkoRoutes);
app.use ('/users', usersRoutes);
app.use ('/carts', cartRoutes);

// Ruta de fallback para manejar rutas Angular (evitar errores 404 al recargar la página)
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/funko-store/index.html');
});