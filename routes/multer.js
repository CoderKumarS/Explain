const multer = require("multer");
const {v4: uuidv4} = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null, './public/images/uploads')// Destination folder for uploads
    },
    filename: (req,file, cb)=>{
        const uniqueFileName = uuidv4(); //Generating a unique filename using uuid
        cb(null, uniqueFileName+path.extname(file.originalname)); //use the unique file name for the uploaded file
    }
});
const upload = multer({storage : storage});

module.exports = upload;