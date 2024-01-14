const funkoServices = require('../services/funkoServices');

module.exports = {
    getAllFunkos: async(req, res) => {
        try{
            const funkos = await funkoServices.getAllFunkos();
            res.json(funkos);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    getFunkoById: async (req, res) => {
        try{
            
            const funko = await funkoServices.getFunkoById(req.params.id);
            res.json(funko);
        }
        catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    addFunko: async (req, res) => {
        try{
            const funko = await funkoServices.addFunko(req.body);
            res.json(funko);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    updateFunko: async (req, res) => {
        try{
            const funko = await funkoServices.updateFunko(req.params.id, req.body);
            res.json(funko);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    },
    deleteFunko: async (req, res) => {
        try{
            const funko = await funkoServices.deleteFunko(req.params.id);
            res.json(funko);
        }catch(error){
            console.log(error);
            res.json({error: 'Ocurrio un error'});
        }
    }
}