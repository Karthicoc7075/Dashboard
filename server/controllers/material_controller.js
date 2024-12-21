const Material = require('../models/material_model');
const Slider = require('../models/slider_model');
const CustomError = require('../errors');
const { materialImagesContainerClient, materialContainerClient } = require('../services/azure/azureService');
const axios = require('axios');
const  getFileSize = require('../utils/downloadFile');
const Report = require('../models/report_model');

exports.createMaterial = async (req, res, next) => {
    const { title, classId, subjectId, mediumId, fileType, fileLink } = req.body;
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    try {
        if (!title || !classId || !subjectId || !mediumId || !fileType) {
            throw new CustomError.BadRequestError('All fields are required');
        }

        if (!req.files.image) {
            throw new CustomError.BadRequestError('image is required');
        }

        const imageData = req.files.image[0]
        const imageName = `${Date.now()}-${imageData.originalname}`;
        const blockBlobClient = materialImagesContainerClient.getBlockBlobClient(imageName);

        try {
            await blockBlobClient.upload(imageData.buffer, imageData.size);
        } catch (err) {
            throw new CustomError.InternalServerError('Failed to upload image');
        }

        let updatedData;

        if (fileType == 'linkFile') {

            if(!fileLink){
                throw new CustomError.BadRequestError('File link is required');
            }
    
        const fileSizeBytes = await getFileSize(fileLink)
        
        
        const fileSize =  fileSizeBytes >= megabyte ? `${(fileSizeBytes / megabyte).toFixed(2)}MB`: `${(fileSizeBytes / kilobyte).toFixed(2)}KB`


            updatedData = { title, class: classId, subject: subjectId, medium: mediumId, fileType, fileLink, fileSize, image: imageName, createdBy: req.user.userId }
        } else if (fileType == "uploadFile") {
            if (!req.files.file || !req.files.image) {
                throw new CustomError.BadRequestError('File is required');
            }

            const file = req.files.file[0];
            const fileName = `${Date.now()}-${file.originalname}`;
            const fileBlockBlobClient = materialContainerClient.getBlockBlobClient(fileName);

            try {
                await fileBlockBlobClient.upload(file.buffer, file.size)
            } catch (err) {
                throw new CustomError.InternalServerError('Failed to upload image');
            }
            const fileSizeBytes = file.size
            const fileSize = fileSizeBytes >= megabyte ? `${(fileSizeBytes / megabyte).toFixed(2)}MB`: `${(fileSizeBytes / kilobyte).toFixed(2)}KB`
            updatedData = { title, class: classId, subject: subjectId, medium: mediumId, fileType, fileLink: fileName, fileSize, image: imageName, createdBy: req.user.userId }
        } else {
            throw new CustomError.BadRequestError("File type invaild")
        }
        const material = new Material(updatedData);
        const createdMaterial = await material.save();
        createdMaterial.image = `${materialImagesContainerClient.url}/${imageName}`;
        return res.status(200).json({ message: 'Material created successfully', data: createdMaterial });
    }
    catch (err) {
        next(err);
    }
}


exports.createMaterialLink = async (req, res, next) => {
    const { title, classId, subjectId, mediumId, fileType, fileLink, fileSize } = req.body;

    try {
        if (!title || !classId || !subjectId || !mediumId || !fileType || !fileLink || !fileSize) {
            throw new CustomError.BadRequestError('All fields are required');
        }



    }
    catch (err) {
        next(err);
    }

}

exports.getMaterial = async (req, res, next) => {
    const { materialId } = req.params;

    try {
        const material = await Material.findOne({ _id: materialId });
        if (!material) {
            throw new CustomError.NotFoundError('Material not found');
        }

      

        if(material.fileType=='uploadFile'){
            material.fileLink = `${materialContainerClient.url}/${material.fileLink}`
        }
        material.image = `${materialImagesContainerClient.url}/${material.image}`;

        res.status(200).json({ message: 'Get Material', data: material });
    } catch (err) {
        next(err);
    }
}

exports.getAllMaterials = async (req, res, next) => {
    const page = req.query.page;
    const postLimit = req.query.limit;

    
    try {
        const materials = await Material.find( )
            .sort({ createdAt: -1 })
            .limit(postLimit)
            .skip((page - 1) * postLimit)
            .populate('class subject medium');

        const totalCount = await Material.countDocuments();


        const allMaterials = materials.map((materials) => {
            return {
                _id: materials._id,
                title: materials.title,
                status: materials.status,
                views: materials.views,
                image: `${materialImagesContainerClient.url}/${materials.image}`,
                createdAt: materials.createdAt
            }
        })


        res.status(200).json({ message: 'All materials', data: allMaterials, totalCount });
    } catch (err) {
        next(err);
    }

}


exports.updateMaterial = async (req, res, next) => {
    const { materialId } = req.params;
    const { title, classId, subjectId, mediumId, fileType, fileLink, fileSize, image } = req.body;
    console.log(title, classId, subjectId, mediumId, fileType, fileLink, fileSize);
    let updateData;
    try {
        if (!title || !classId || !subjectId || !mediumId) {
            throw new CustomError.BadRequestError('All fields are required');
        }

        const findMaterial = await Material.findOne({ _id: materialId });

        if (!findMaterial) {
            throw new CustomError.NotFoundError('Material not found');
        }

        if (findMaterial.fileType === 'linkFile') {
            let newImageName;
            if (req.files.image) {
                const imageData = req.files.image[0]

                const imageName = findMaterial.image;
                const delteBlockBlobClient = materialImagesContainerClient.getBlockBlobClient(imageName);
                await delteBlockBlobClient.delete()
                newImageName = `${Date.now()}-${imageData.originalname}`;
                const uploadBlockBlobClient = materialImagesContainerClient.getBlockBlobClient(newImageName);

                try {
                    await uploadBlockBlobClient.upload(imageData.buffer, imageData.size);
                }
                catch (err) {
                    console.log(err);
                    throw new CustomError.InternalServerError('Failed to upload image');
                }

                updateData = { title, class: classId, subject: subjectId, medium: mediumId, fileType, fileLink, fileSize, image: newImageName }
            } else {
                updateData = { title, class: classId, subject: subjectId, medium: mediumId, fileLink, fileSize }
            }


        } else if (findMaterial.fileType === 'uploadFile') {



            if (req.files.image && req.files.file) {
                const imageData = req.files.image[0];
                const fileData = req.files.file[0];

                const imageName = findMaterial.image;
                const filename = findMaterial.fileLink;
                const delteImageBlockBlobClient = materialImagesContainerClient.getBlockBlobClient(imageName);
                const delteFileBlockBlobClient = materialContainerClient.getBlockBlobClient(filename);
                await delteImageBlockBlobClient.delete()
                await delteFileBlockBlobClient.delete()
                const newImageName = `${Date.now()}-${imageData.originalname}`;
                const newFileName = `${Date.now()}-${fileData.originalname}`;
                const fileSize = `${(fileData.size / 1024 / 1024).toFixed(2)}MB`;
                const uploadImageBlockBlobClient = materialImagesContainerClient.getBlockBlobClient(newImageName);
                const uploadFileBlockBlobClient = materialContainerClient.getBlockBlobClient(newFileName);

                try {
                    await Promise.all([
                        uploadImageBlockBlobClient.upload(imageData.buffer, imageData.size),
                        uploadFileBlockBlobClient.upload(fileData.buffer, fileData.size)
                    ]);
                } catch (err) {
                    throw new CustomError.InternalServerError('Failed to upload image');
                }
                

                updateData = { title, class: classId, subject: subjectId, medium: mediumId, fileType, fileLink: newFileName, fileSize, image: newImageName }
            } else if (req.files.image) {
                const imageData = req.files.image[0];
                const imageName = findMaterial.image;
                const delteBlockBlobClient = materialImagesContainerClient.getBlockBlobClient(imageName);
                await delteBlockBlobClient.delete()

                const newImageName = `${Date.now()}-${imageData.originalname}`;
                const uploadBlockBlobClient = materialImagesContainerClient.getBlockBlobClient(newImageName);

                try {
                    await uploadBlockBlobClient.upload(imageData.buffer, imageData.size);
                }
                catch (err) {
                    throw new CustomError.InternalServerError('Failed to upload image');
                }

                updateData = { title, class: classId, subject: subjectId, medium: mediumId, fileType, fileSize, image: newImageName }

            } else if (req.files.file) {
                const fileData = req.files.file[0];
                const filename = findMaterial.fileLink;
                const delteBlockBlobClient = materialContainerClient.getBlockBlobClient(filename);
                await delteBlockBlobClient.delete()

                const newFileName = `${Date.now()}-${fileData.originalname}`;
                const uploadBlockBlobClient = materialContainerClient.getBlockBlobClient(newFileName);

                try {
                    await uploadBlockBlobClient.upload(fileData.buffer, fileData.size);
                }
                catch (err) {
                    throw new CustomError.InternalServerError('Failed to upload image');
                }

                updateData = { title, class: classId, subject: subjectId, medium: mediumId, fileLink: newFileName, fileSize }

            }
            else {
                updateData = { title, class: classId, subject: subjectId, medium: mediumId }

            }

        } else {
            throw new CustomError.BadRequestError("File type invaild")
        }


        const updatedMaterial = await Material.findByIdAndUpdate({ _id: materialId }, updateData, { new: true });
        updatedMaterial.image = image
        res.status(200).json({ message: 'Material updated successfully', data: updatedMaterial });
    }
    catch (err) {
        next(err);
    }
}


exports.deleteMaterial = async (req, res, next) => {
    const { materialId } = req.params;


    try {

        const findMaterial = await Material.findOne({ _id: materialId });

        if (!findMaterial) {
            throw new CustomError.NotFoundError('Material not found');
        }

        if (findMaterial.fileType === 'Link File') {
            const imageName = findMaterial.image;
            const delteBlockBlobClient = materialImagesContainerClient.getBlockBlobClient(imageName);
            await delteBlockBlobClient.delete()
        }

        if (findMaterial.fileType === 'Upload File') {
            const imageName = findMaterial.image;
            const filename = findMaterial.fileLink;
            const delteImageBlockBlobClient = materialImagesContainerClient.getBlockBlobClient(imageName);
            const delteFileBlockBlobClient = materialContainerClient.getBlockBlobClient(filename);
            await delteImageBlockBlobClient.delete()
            await delteFileBlockBlobClient.delete()
        }

        const deleteSlider = await Slider.deleteMany({ material: materialId });
        const deleteReports = await Report.deleteMany({ postId: materialId });
        console.log('deleteSlider', deleteSlider);

        const deletedMaterial = await Material.findByIdAndDelete({ _id: materialId }, { new: true })
        res.status(200).json({ message: 'Material deleted successfully', data: deletedMaterial });
    }
    catch (err) {
        next(err)
    }

}


exports.updateStatus = async (req, res, next) => {
    const { materialId } = req.params;

    try {

        const materialExists = await Material.findOne({ _id: materialId })
        if (!materialExists) {
            throw new CustomError.NotFoundError('Material with this id does not exists')
        }

        const status = !materialExists.status

        const updatedMaterial = await Material.findByIdAndUpdate({ _id: materialId }, { status }, { new: true })
        const data = {
            _id: updatedMaterial._id,
            title: updatedMaterial.title,
            status: updatedMaterial.status,
            views: updatedMaterial.views,
            image: `${materialImagesContainerClient.url}/${updatedMaterial.image}`,
            createdAt: updatedMaterial.createdAt
        }
        res.status(200).json({ message: 'Material status updated successfully', data });
    } catch (err) {
        next(err);
    }
}