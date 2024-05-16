import jwt from 'jsonwebtoken'

// sẽ tạo ra 3 chức năng
// tạo token
export const createToken = (data) => {
    return jwt.sign(data, "BI_MAT" , {expiresIn: "5m"}) // (payload, signature, header)
    // payload: object (nếu có tham số thứ 3 thì bắt buộc là object) còn nếu có 2 tham số thì chỗ này là string vẫn được
    // signature: chỉ mình nhớ và hong public nó
    // header: {} mặc định là HS256 (sẽ chuyển thành dạng string)
    // ở tham số thứ 3: còn quan tâm thêm 1 thứ là thời hạn sử dụng của token expiresIn:
    // thường tồn tại 5 - 10' => refresh token
    // đơn vị dùng là ms
    // TH1: 5 TH2: "5ms"
}


// kiểm tra token
// 3 lỗi thường gặp => hết hạn, sai khóa bảo mật ("BI_MAT"), định dạng token (thiếu chữ trong token)
export const checkToken = (token) => {
    return jwt.verify(token, "BI_MAT", (error, decode) => {
        // nếu bị 1 trong 3 lỗi trên thì error tự động trả về định dạng lỗi còn hong bị thì gtri trả về là null
        // nếu hong có lỗi thì decode thì sẽ trả về giống như ở dưới
        return error; // do mình chỉ ktra lỗi thôi nên mình hong quan tâm tới biến decode
        
        // chú ý return error sẽ trả về jwt.verify và sau đó return cho hàm checkToken
        // rút ngắn lại
        // return jwt.verify(token, "BI_MAT", error => error)
    });

}


// giải mã token
export const decodeToken = (token) => {
    return jwt.decode(token);
}

export const middleToken = (req, res, next) => {
    let {token} = req.headers;
    if (checkToken(token) == null){
        next();
    }else{
        res.status(401).send("Not authorized");
    }
}