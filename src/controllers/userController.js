import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

import bcrypt from 'bcrypt'
import { createToken } from "../config/jwt.js";

const model = initModels(sequelize);

const signUp = async (req, res) => {

    // dòng try giúp mình xử lý lỗi 500
    try {
        let { fullName, email, password } = req.body;

        let checkEmail = await model.users.findOne({
            where: {
                email,
            }
        })
    
        // nếu dùng findAll thì nó sẽ trả danh sách
        // thì để kiểm tra thì if (checkEmail.length > 0)
    
        if (checkEmail){ //kiểm tra email trùng
            responseData(res, "Existed Email", 400, ""); // chỉ trả thông báo chứ hong có chức năng dừng lệnh
            return;
        }
    
        // yarn add bcrypt
        let newData = {
            full_name: fullName, //tương ứng với các column trong table nên cần follow đúng format
            email, // nếu hong thì column đó sẽ để giá trị null
            pass_word: bcrypt.hashSync(password, 10),
            role: "USER" // có những column có giá trị cứng
        }
    
    
        // INSERT into users VALUE (....)
        await model.users.create(newData);

        responseData(res, "SignUp Success", 200, "");
    } catch(error){ // việc này sẽ hỗ trợ trả message để biết lỗi ở chỗ nào
        // tránh trường hợp tùy hệ thống sẽ trả lỗi source code ra thẳng cho client thấy
        // lỗi 500 là lỗi BE control hong được - là lỗi hong biết trước
        responseData(res, "System error", 500, "")
    }



}

const login = async (req, res) => {
    let { email, password } = req.body;

    let checkEmail = await model.users.findOne({
        where: {
            email
        }
    })

    // nếu dùng findAll thì nó sẽ trả danh sách
    // thì để kiểm tra thì if (checkEmail.length > 0)

    if (checkEmail){ //kiểm tra email trùng
        if (bcrypt.compareSync(password, checkEmail.pass_word)){
        //if (checkEmail.pass_word == password){
            let token = createToken({userId: checkEmail.dataValues.user_id});

            responseData(res, "Login Success", 200, token); // chỉ trả thông báo chứ hong có chức năng dừng lệnh
            return;
        }
        
        responseData(res, "Password is incorrect", 400, ""); // chỉ trả thông báo chứ hong có chức năng dừng lệnh
        return;
    }

    responseData(res, "Email is incorrect", 400, "");
}

const loginFacebook = async (req, res) => {

    // dòng try giúp mình xử lý lỗi 500
    try {
        let { fullName, email, faceAppId } = req.body;

        let checkUser = await model.users.findOne({
            where: {
                face_app_id: faceAppId
            }
        })
    
        // nếu dùng findAll thì nó sẽ trả danh sách
        // thì để kiểm tra thì if (checkEmail.length > 0)
    
        let token = "";

        if (checkUser){ //kiểm tra email trùng
            token = createToken({userId: checkUser.dataValues.user_id});
        } else {
            let newData = {
                full_name: fullName, //tương ứng với các column trong table nên cần follow đúng format
                email, // nếu hong thì column đó sẽ để giá trị null
                face_app_id: faceAppId,
                pass_word: "",
                role: "USER" // có những column có giá trị cứng
            }

            let data = await model.users.create(newData);

            token = createToken({userId: data.dataValues.user_id});
        }

        responseData(res, "Login Success", 200, token);
    

    } catch(error){ // việc này sẽ hỗ trợ trả message để biết lỗi ở chỗ nào
        // tránh trường hợp tùy hệ thống sẽ trả lỗi source code ra thẳng cho client thấy
        // lỗi 500 là lỗi BE control hong được - là lỗi hong biết trước
        responseData(res, "System error", 500, "")
    }



}

export {
    signUp,
    login,
    loginFacebook
}