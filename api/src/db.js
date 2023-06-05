require('dotenv').config(); //carga las varibles de entorno de
const { Sequelize } = require('sequelize'); //se utiliza la clase Sequelize para interctuar con la base de datos
const fs = require('fs');
const path = require('path');
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename); //aqui se obtiene el nombre base del archivo actual en Node.js y se asigna a la constante basename

const modelDefiners = []; //Se crea el array para almacenar los archivos de la carpeta Models 

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));//aqui se agrega al array todo lo requerido
  });

modelDefiners.forEach(model => model(sequelize)); // Injectamos la conexion (sequelize) a todos los modelos para interactuar con la base de datos.

let entries = Object.entries(sequelize.models);//Esta línea obtiene un arreglo de pares clave-valor de todas las propiedades del objeto
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Country, Activity } = sequelize.models; //esta linea trae los modelos de sequelize para poder hacer las relaciones

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Country.belongsToMany(Activity, { through: 'countryxactivity', timestamps: false });
Activity.belongsToMany(Country, { through: 'countryxactivity', timestamps: false });

module.exports = {
  ...sequelize.models, // // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
