const FunkoModel = require('../models/funkoModel');

module.exports = {
    getAllFunkos: async(req, res) => {
        try {
            const { page, limit } = req.query || {};
            
            const options = {
                attributes: ['id', 'name', 'price', 'category', 'front_image', 'back_image', 'description', 'stock', 'licence', 'serie']
            };

            if (limit) {
                const limitNum = parseInt(limit);
                const pageNum = parseInt(page) || 1;
                options.limit = limitNum;
                options.offset = (pageNum - 1) * limitNum;
            }
            
            const { count, rows } = await FunkoModel.findAndCountAll(options);
            
            return { funkos: rows, total: count };
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    getFunkoById : async(id) => {
        try{
            const funko = await FunkoModel.findByPk(id);
            return funko;
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    addFunko: async(newFunko) => {
        try{
            const funko = await FunkoModel.create(newFunko);
            return funko;
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    updateFunko: async(id, funko) => {
        try{
            await FunkoModel.update(funko, {
                where: {
                    id: id
                }
            });
            return {success: 'Se ha modificado el funko'};
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    },
    deleteFunko: async(id) => {
        try{
            await FunkoModel.destroy({
                where: {
                    id: id
                }
            });
            return {success: 'Se ha eliminado el funko'};
        }catch(error){
            console.log(error);
            return {error: 'Ocurrio un error'};
        }
    }
}