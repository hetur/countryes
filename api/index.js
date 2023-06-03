//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const data = require('./src/data.json'); //aqui se carga el json en caso de que no respond la api

// Syncing all the models at once.
conn.sync({ alter: true }).then(async ()=> { //se usa alter true par reflejar cambios a diferncia de  usar force true que elimina todos los registros al reinicializar la base de datos.
  try {
    let restCountriesDB = await Country.findAll()
    if (restCountriesDB.length === 0) {
      try {
        let response = await axios.get('http://restcountries.com/v3.1/all')
        let api = response.data
        api && api.map(async el => await Country.findOrCreate({  //mapeo y controlo que no se repitan registros.
          where:{
            id:el.cca3,
            name: el.name.common,
            flag: el.flags[1],
            continent: el.continents ? el.continents[0] : 'Continente no encontrado',
            capital: el.capital ? el.capital[0]: 'Capital no encontrada',
            subregion: el.subregion ? el.subregion : 'Subregion no encontrada',
            area: el.area,
            population: el.population || 0
          }
        }));
      } catch (error) {
        console.error(error);
        console.log('Loading data from data.json');
        data && data.map(async el => await Country.findOrCreate({
          where:{
            id:el.cca3,
            name: el.name.common,
            flag: el.flags[1],
            continent: el.continents ? el.continents[0] : 'Continente no encontrado',
            capital: el.capital ? el.capital[0]: 'Capital no encontrada',
            subregion: el.subregion ? el.subregion : 'Subregion no encontrada',
            area: el.area,
            population: el.population || 0
          }
        }));
      };
    };
  } catch (error) {
    throw new Error(error.message);
  };
  server.listen(process.env.PORT || 3001, () => {
    console.log('Listening at 3001'); // eslint-disable-line no-console
  });
});
