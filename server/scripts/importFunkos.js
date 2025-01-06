const fs = require('fs');
const db = require('../data/db');
const Funko = require('../src/models/funkoModel');

const importFunkos = async () => {
    try {
        // Leer el archivo funkos.json
        const data = fs.readFileSync('../db/funkos.json', 'utf8');
        const funkos = JSON.parse(data).funkos;

        // Sincronizar la base de datos
        await db.sync();

        // Insertar cada funko en la base de datos
        for (const funko of funkos) {
            if (funko.id == null) {
                console.error(`El funko con nombre "${funko.name}" no tiene un ID válido.`);
                continue; // Saltar este registro si el ID es nulo
            }

            await Funko.create({
                id: funko.id, // Asegúrate de que el ID se esté pasando correctamente
                name: funko.name,
                serie: funko.serie,
                category: funko.category,
                licence: funko.licence,
                price: funko.price,
                stock: funko.stock,
                front_image: funko.frontImage,
                back_image: funko.backImage,
                description: funko.description,
            });
        }

        console.log('Todos los funkos han sido importados exitosamente.');
    } catch (error) {
        console.error('Error al importar funkos:', error);
    } finally {
        // Cerrar la conexión a la base de datos
        await db.close();
    }
};

importFunkos();
