const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:4200', 'https://funkostore-postgres-2025.onrender.com', 'https://funko-store-seven.vercel.app'],
  credentials: true
}));

app.options('*', cors()); // Permite preflight requests para todas las rutas

const db = require('./data/db');
const funkoRoutes = require('./src/routes/funkoRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const cartRoutes = require('./src/routes/cartRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'dist', en la raíz del sitio
app.use(express.static(__dirname + '/dist/funko-store'));

const conexionDB = async () => {
  try {
    await db.authenticate();
    console.log("Conexión exitosa");
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, () => {
  conexionDB();
  console.log(`API_BACK escuchando en http://localhost:${port}`);
});

app.use('/fk', funkoRoutes);
app.use('/users', usersRoutes);
app.use('/carts', cartRoutes);

// Asegurarse de que todas las rutas que no sean de la API redirijan a 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/funko-store', 'index.html'));
});
