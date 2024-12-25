const jwt = require('jsonwebtoken');
const { env, loadEnvFile} = require ('node:process')
process.loadEnvFile("./.env")

const secretKey = env.JWT_SECRET || 'your_secret_key'; // Asegúrate de que coincida con el que usaste para firmar el token

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.userId = decoded.id; // Almacenar el ID del usuario en la solicitud
        next();
    });
};

module.exports = verifyToken; 