const { Sequelize } = require("sequelize");
const pg = require('pg');

const sequelize = new Sequelize({
    dialect: 'postgres',
    dialectModule: pg,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    dialectOptions: {
        ssl: process.env.LIVE_DATABASE === 'true' ? {
            rejectUnauthorized: false,  // Connect Unauthorized Live Database
        } : false,
    },
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
        sequelize.sync()
            .then(() => console.log('All models were synchronized successfully.'))
            .catch((error2) => console.error("Unable to sync to the database:", error2))
    })
    .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;