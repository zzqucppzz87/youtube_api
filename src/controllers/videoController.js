import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

const model = initModels(sequelize);

const getVideo = async (req, res) => {

    let data = await model.video.findAll({
        include: ["type", "user"], 
    });

    // khi trả kiểu này thì cấu trúc file mình thay đổi nhan
    responseData(res, "Success", 200, data);
}

const getVideoType = async (req,res) => {
    let data = await model.video_type.findAll();

    responseData(res, "Success", 200, data);    
}

const getVideoByType = async (req,res) => {
    let { typeId } = req.params;

    let data = await model.video.findAll({
        where: {
            type_id: typeId,
        }
    });

    responseData(res, "Success", 200, data);    
}

const searchVideo = (req, res) => {
    res.send("Hello World MVC!!!");
}

const getVideoPage = async (req, res) => {

    let { page } = req.params;
    let pageSize = 3; 
    let index = (page - 1)*pageSize;

    // SELECT * FROM video LIMIT page, pageSize
    let data = await model.video.findAll({
        offset: index,
        limit: pageSize
    });

    let dataCount = await model.video.count();

    // khi trả kiểu này thì cấu trúc file mình thay đổi nhan
    responseData(res, "Success", 200, {data, pagination: Math.ceil(dataCount/pageSize)});
}

const getVideoById = async (req, res) => {

    let { videoId } = req.params;

    let data = await model.video.findByPk(videoId, {
        include: ["user"]
    });

    // khi trả kiểu này thì cấu trúc file mình thay đổi nhan
    responseData(res, "Success", 200, data);
}

export {
    getVideo,
    searchVideo,
    getVideoType,
    getVideoByType,
    getVideoPage,
    getVideoById
}