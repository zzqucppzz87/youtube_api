export const responseData = (res, message, code, data) => {
    // res.send == res.json
    res.status(code).json({
        message,
        code,
        data,
        date: new Date()
    })
}