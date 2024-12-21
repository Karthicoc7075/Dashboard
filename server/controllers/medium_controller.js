const Medium = require('../models/medium_model');
const CustomError = require('../errors');
const { mediumImagesContainerClient } = require('../services/azure/azureService');
const Material = require('../models/material_model');
const Slider = require('../models/slider_model');
const Report = require('../models/report_model');

exports.createMedium = async (req, res, next) => {
    const { mediumName } = req.body;
    try {
        if (!mediumName) {
            throw new CustomError.BadRequestError('All fields are required');
        }


        const mediumExist = await Medium.findOne({ mediumName });

        if (mediumExist) {
            throw new CustomError.BadRequestError('Medium name already exist');
        }
        
        const imageName = `${Date.now()}-${req.file.originalname}`;
        const blockBlobClient = mediumImagesContainerClient.getBlockBlobClient(imageName);

        try {
            await blockBlobClient.upload(req.file.buffer, req.file.size);
        }
        catch (err) {
            throw new CustomError.InternalServerError('Failed to upload image');
        }

        const createMedium = await Medium.create({ mediumName, image: imageName, createdBy: req.user.userId  });
        createMedium.image = mediumImagesContainerClient.url + '/' + createMedium.image;
        res.status(201).json({ data: createMedium, success: true, message: 'Medium created successfully' });
    } catch (err) {
        next(err);
    }
}


exports.getMedium = async (req, res, next) => {
    const { mediumId } = req.params;
    try {
        const findMedium = await Medium.findOne({ _id: mediumId })
        if (!findMedium) {
            throw new CustomError.NotFoundError('Medium not found');
        }
        findMedium.image = mediumImagesContainerClient.url + '/' + findMedium.image;

        res.status(200).json({ data: findMedium });
    } catch (err) {
        next(err);
    }
}

exports.getAllMedium = async (req, res, next) => {
    try {
        const mediums = await Medium.find();

        const mediumsWithImage = mediums.map(medium => {
            return { 
                _id: medium._id,
                mediumName: medium.mediumName,
                image: mediumImagesContainerClient.url + '/' + medium.image
            }
        })


        res.status(200).json({ data: mediumsWithImage });
    } catch (err) {
        next(err);
    }
}

exports.updateMedium = async (req, res, next) => {
    const { mediumId } = req.params;
    const { mediumName, imageId } = req.body;
    try {
        const findMedium = await Medium.findOne({ _id: mediumId })
        if (!findMedium) {
            throw new CustomError.NotFoundError('Medium not found');
        }

        if (findMedium.mediumName != mediumName) {
            const alreadyExistMediumName = await Medium.findOne({ mediumName })

            if (alreadyExistMediumName) {
                throw new CustomError.BadRequestError('Medium name already exist');
            }
        }
        let newImageName;
        if (req.file) {

            const imageName = imageId.split('/').pop();
            const delteBlockBlobClient = mediumImagesContainerClient.getBlockBlobClient(imageName);
            await delteBlockBlobClient.delete()

            newImageName = `${Date.now()}-${req.file.originalname}`;
            const uploadBlockBlobClient = mediumImagesContainerClient.getBlockBlobClient(newImageName);

            try {
                await uploadBlockBlobClient.upload(req.file.buffer, req.file.size);
            }
            catch (err) {
                throw new CustomError.InternalServerError('Failed to upload image');
            }
        }

        const updateData = req.file ? { mediumName, image: newImageName } : { mediumName }


        const updatedMedium = await Medium.findByIdAndUpdate({ _id: mediumId }, updateData, { new: true })
        updatedMedium.image = mediumImagesContainerClient.url + '/' + updatedMedium.image;
        res.status(200).json({ data: updatedMedium, message: 'Medium updated successfully' });

    } catch (err) {
        next(err)
    }

}

exports.deleteMedium = async (req, res,next) => {
    const { mediumId } = req.params;
    try {
        const findMedium = await Medium.findOne({ _id: mediumId })
        if (!findMedium) {
            throw new CustomError.NotFoundError('Medium not found');
        }

        const imageName =  findMedium.image
        const deleteBlockBlobClient = mediumImagesContainerClient.getBlockBlobClient(imageName);
        await deleteBlockBlobClient.delete()

        const materials = await Material.find({ medium: mediumId })
        const materialIds = materials.map(material => material._id)
        const deletedMaterialSlider = await Slider.deleteMany({ material: { $in: materialIds } })
        const deleteReports = await Report.deleteMany({ postId: { $in: materialIds } })
        const deletedMaterial = await Material.deleteMany({ medium: mediumId })

        console.log('delteMaterial',deletedMaterial);
        console.log('deleteSlider',deletedMaterialSlider);

        const deletedClass = await Medium.findByIdAndDelete({ _id: mediumId }, { new: true })
        res.status(200).json({ message: 'Medium deleted successfully', data: deletedClass })

    } catch (err) {
        next(err)
    }
}