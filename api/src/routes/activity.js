const { Router } = require('express'); //importa el objeto Router desde el módulo express, que se utiliza para declarar rutas en la aplicación
const { conn } = require('../db');
const { Activity, Country, countryxactivity } = conn.models;
const router = Router();

router.get('/', async (_req, res, next) => {
    try {
        const newActivity = await Activity.findAll({ //usa el metodo de Sequelize para buscar todas las actividades en la base de datos
            include: [ //obtener los países asociados a cada actividad a través de la tabla intermedia "countryxactivity"
                {
                    model: Country,
                    through: "countryxactivity", 
                },
            ],
        });
        return res.send(newActivity);
    } catch (error) {
        next(error)
    };
});

router.post('/', async (req, res, next) => {
    try {
        const { name,
            physicalDifficulty,
            technicalDifficulty,
            duration,
            season,
            countryId } = req.body;
        const newActivity = await Activity.create({ //metodo de Sequelize para crear una nueva actividad en la base de datos con los datos proporcionados en ls solicitud
            name,
            physicalDifficulty,
            technicalDifficulty,
            duration,
            season,
        });
        if (countryId)
            await newActivity.addCountry(countryId); //utiliza el método addCountry() de Sequelize para asociar el país a la actividad recién creada
        return res.status(201).send(newActivity);
    } catch (error) {
        next(error)
    };
});

module.exports = router;
