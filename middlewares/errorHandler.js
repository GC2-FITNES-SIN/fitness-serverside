module.exports = (err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message || "Internal server error";

    switch (err.name) {
        case "InvalidToken":
            status = 401;
            message = "Invalid token";
            break;
    
        case "SequelizeValidationError":
            status = 400;
            message = err.errors[0].message;
            break;
    };

    req.status(status).json({message})
}