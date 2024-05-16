import config from '../config/config.js';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    config.database, 
    config.user, 
    config.pass, 
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect
    }
);

export default sequelize;

// dùng để test kết nối 
//try {
//    sequelize.authenticate();
//    console.log("OK");
//} catch(error){
//    console.log(error);
//}

// node src/models/connect.js để chạy