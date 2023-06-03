const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const activityRoutes = require('./activity');
const countryRoutes = require('./country');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/activity', activityRoutes);// configur el enrutador para manejar las rutas de "activity"
router.use('/country', countryRoutes); // configur el enrutador para manejar las rutas de "country"

module.exports = router;
