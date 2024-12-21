const multer = require('multer');
const CustomError = require("../errors");


const allowedFormats = {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif','image/webp'],
    DOCUMENT: ['application/pdf', 'application/msword']
};
const storage = multer.memoryStorage()
const upload = multer({ storage: storage,limits: { fileSize: 1024 * 1024 * 5 }})

function uploadImage(fileFormat) {
    return function(req, res, next) {
        upload.single('file')(req, res, function(err) {
           
          try{
           
            if(req.file){
                if (!fileFormat.includes(req.file.mimetype)) {
                    throw new CustomError.BadRequestError('Image format not allowed');
                }
            }
            

           
            if (err) {
                console.log(err);
                throw new CustomError.BadRequestError('Image upload failed');
            }

            if (!req.file) {
               throw new CustomError.BadRequestError('Image is required');
            }
          
            next();
          }
          catch(err){
            next(err)
          }
        });
    };
}

function uploadUpdateImage(fileFormat) {
    return function(req, res, next) {
        upload.single('file')(req, res, function(err) {
           
          try{
           
            if(req.file){
                if (!fileFormat.includes(req.file.mimetype)) {
                    throw new CustomError.BadRequestError('Image format not allowed');
                }
            }
            

          
            if (err) {
                console.log(err);
                throw new CustomError.BadRequestError('Image upload failed');
            }

            
          
            next();
          }
          catch(err){
            next(err)
          }
        });
    };
}

function uploadImageandFile() {
    return function(req, res, next) {
        
            upload.fields([
                { name: 'image', maxCount: 1,minCount:0 },
                { name: 'file', maxCount: 1,minCount:0 }
            ])(req, res, function(err) {
                try {
                if (err) {
                    throw new CustomError.BadRequestError('File upload failed');
                }
                
                // if (!req.files.image || !req.files.file) {
                //     throw new CustomError.BadRequestError('Both image and file are required');
                // }
                if(req.files.image){
                    const image = req.files.image[0];

                    if (!allowedFormats.IMAGE.includes(req.files.image[0].mimetype)) {
                        throw new CustomError.BadRequestError('Image format not allowed');
                    }
                }
                
                if(req.files.file){
                    const file = req.files.file[0];

                    if (!allowedFormats.DOCUMENT.includes(req.files.file[0].mimetype)) {
                        throw new CustomError.BadRequestError('File format not allowed');
                    }
                }
                
                next();
            
        } catch(err) {
            next(err);
        }
    });
    };
}


module.exports = { uploadImage, allowedFormats, uploadUpdateImage,uploadImageandFile, };




       



