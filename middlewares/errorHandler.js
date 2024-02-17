const errorHandler = (err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message || "Internal server error";

    switch (err.name) {

        case "InvalidToken":
            status = 401;
            message = "Invalid token";
            break;

        case "BadRequest":
            res.status(400).json({ message: err.message });            
            break;

        case "NotFound":
            res.status(404).json({ message: err.message });
            break;

        case "Unauthorized":
            res.status(401).json({ message: err.message });
            break;

        default: res.status(500).json({ message : "Internal server error"});

    };

}

module.exports = errorHandler