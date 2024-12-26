const express = require('express');
const app = express();
const path = require('path');  // Asegúrate de importar path
const port = process.env.PORT || 3000;
const cors = require('cors');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');

// Configurar CORS
app.use(cors({
  origin: ['http://localhost:4200', 'https://funkostore-postgres-2025.onrender.com','https://funko-store-seven.vercel.app'],
  // origin: '*',
  credentials: true
}));

app.options('*', cors()); // Permite preflight requests para todas las rutas

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Configurar rutas y middlewares
const db = require('./data/db');
const funkoRoutes = require('./src/routes/funkoRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const cartRoutes = require('./src/routes/cartRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// Servir archivos estáticos desde la carpeta 'dist', en la raíz del sitio
app.use(express.static(path.join(__dirname, 'dist', 'funko-store')));

// Rutas de la API
app.use('/fk', funkoRoutes);
app.use('/users', usersRoutes);
app.use('/carts', cartRoutes);

// Ruta de fallback para manejar rutas Angular (evitar errores 404 al recargar la página)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'funko-store', 'index.html'));
});

// Conexión a la base de datos
const conexionDB = async () => {
  try {
    await db.authenticate();
    console.log("conexion exitosa");
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, () => {
  conexionDB();
  console.log(`API_BACK listening at http://localhost:${port}`);
});
