const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);

const db = {};

let sequelize;
if (process.env.NODE_ENV === 'test') {
    sequelize = new Sequelize(process.env.DATABASE_URL_TEST, {
        logging: false
    });

    sequelize.authenticate()
        .then(() => {
            console.log('::: Test database connection has been established successfully :::');
        })
        .catch(err => {
            console.error('Unable to connect to the test database:', err);
        });

} else if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        logging: false,
    });

    sequelize.authenticate()
        .then(() => {
            console.log('::: Database connection has been established successfully :::');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
} else {
    console.error('Database connection string not found');
}


fs
    .readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
