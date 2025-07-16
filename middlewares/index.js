const fs = require("fs");
const path = require("path");

function logReqRes(filename){
    const filePath = path.join(__dirname, "..", filename); // Go one level up to root
    return (req,res,next) => {
    fs.appendFile(
        filePath,
        `${Date.now()} : ${req.ip} : ${req.method}:${req.path}: \n`,
        (err,data) =>{
            if(err)
            return res.status(400).json({msg: "Can,t log users data!"});
            next()
        }
    )
    }
}

module.exports ={
    logReqRes,
}