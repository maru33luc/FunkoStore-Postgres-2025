const fs = require('fs');

const restructureFunkos = () => {
    const data = fs.readFileSync('db/funkos.json', 'utf8');
    const funkos = JSON.parse(data).funkos;

    const updatedFunkos = funkos.map(funko => {
        const { id, name, serie, category, licence, price, stock, frontImage, backImage, description } = funko;
        return {
            id,
            name,
            serie,
            category,
            licence,
            price,
            stock,
            frontImage,
            backImage,
            description
        };
    });

    const updatedData = { funkos: updatedFunkos };
    fs.writeFileSync('db/funkos.json', JSON.stringify(updatedData, null, 2));
    console.log('El archivo funkos.json ha sido actualizado.');
};

restructureFunkos(); 