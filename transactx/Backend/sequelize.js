const { Sequelize } = require('sequelize');
const config = require('./dbConfig');

// Create a Sequelize instance
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.server,
  dialect: 'mssql',
  dialectOptions: {
    options:  {
        trustedConnection: true
      },
  },
});

module.exports = sequelize;
