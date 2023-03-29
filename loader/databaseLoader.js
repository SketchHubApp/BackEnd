const { sequelize } = require('../models');

module.exports =async()=>{
    sequelize.sync({ force: false })
    .then(() => console.log('Database connection successful!!'))
    .catch(err => console.error(err));
}