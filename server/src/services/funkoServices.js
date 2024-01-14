const FunkoModel = require('../models/funkoModel');

module.exports = {
    getAllFunkos: async(req, res) => {
        try{
            const funkos = await FunkoModel.findAll();
            return funkos;
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