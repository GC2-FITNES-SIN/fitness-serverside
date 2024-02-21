const errorHandler = (err, req, res, next) => {
    
    // switch (err.name) {

    //     case "InvalidToken":
    //         res.status(401).json({ message: err.message });
    //         break;

    //     case "BadRequest":
    //         res.status(400).json({ message: err.message });            
    //         break;

    //     case "NotFound":
    //         res.status(404).json({ message: err.message });
    //         break;

    //     case "Unauthorized":
    //         res.status(401).json({ message: err.message });
    //         break;

    //     default: res.status(500).json({ message : "Internal server error"});

    // };

}

module.exports = errorHandler