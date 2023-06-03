const { Router } = require('express');
const { conn } = require('../db');
const { Country, Activity } = conn.models;
const { Op } = require('sequelize')
const router = Router();

router.get('/', (req, res, next) => {
    try {
        if (req.query.name) {
            return Country.findAll({
                attributes: ['flag',
                    'name',
                    'continent',
                    'id',
                    'population',
                    'capital',
                    'subregion',
                    'area'],
                where: {
                    name: {
                        [Op.iLike]: `%${req.query.name}%`
                    }
                },
                include: { model: Activity }
            })
                .then(country => {
                    if (country.length === 0) {
                        return res.send('Not country found')
                    }
                    return res.status(200).send(country)
                });
        } else {
            return Country.findAll({
                attributes: ['flag',
                    'name',
                    'continent',
                    'id',
                    'population',
                    'capital',
                    'subregion',
                    'area'],
                include: { model: Activity }
            })
                .then(country => {
                    return res.status(200).send(country);
                });
        }
    } catch (error) {
        res.status(500).next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const id2 = id.toUpperCase();
        const country = await Country.findAll({
            where: {
                id: id2,
            },
            include: { model: Activity }
        })
        return res.status(200).send(country);
    } catch (error) {
        return res.status(500).next(error)
    };
});

module.exports = router;

// Primero, se importan los módulos necesarios de Express, Sequelize y la conexión a la base de datos que se define en otro archivo. También se importan los modelos de la base de datos necesarios para manejar las solicitudes entrantes.

// Se define el objeto router de Express y se configuran dos rutas diferentes usando los métodos HTTP GET.

// El primer método GET tiene un middleware que verifica si el parámetro "name" está presente en la consulta de la URL. Si es así, se ejecuta una consulta a la base de datos para encontrar todos los países cuyo nombre coincida con el patrón de búsqueda y se devuelve una respuesta con una lista de países encontrados. Si no hay parámetro "name" en la URL, se devuelve una lista de todos los países en la base de datos.

// El segundo método GET usa un parámetro de URL para buscar un país específico por su ID en la base de datos y devuelve la información del país correspondiente.

// Por último, se exporta el objeto router de Express para que pueda ser utilizado por el servidor.