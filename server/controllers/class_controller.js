const { default: mongoose } = require('mongoose')
const Class = require('../models/class_model')
const Subject = require('../models/subject_model')
const Material = require('../models/material_model')
const Slider = require('../models/slider_model')
const CustomError = require('../errors');
const { classImagesContainerClient, subjectImagesContainerClient } = require('../services/azure/azureService');
const Report = require('../models/report_model')

exports.createClass = async (req, res, next) => {
    const { className } = req.body

    try {
        if (!className) {
            throw new CustomError.BadRequestError('All fields are required');
        }

        const alreadyExistClassName = await Class.findOne({ className })

        if (alreadyExistClassName) {
            throw new CustomError.BadRequestError('Class name already exist');
        }
        const imageName = `${Date.now()}-${req.file.originalname}`;
        const blockBlobClient = classImagesContainerClient.getBlockBlobClient(imageName);

        try {
            await blockBlobClient.upload(req.file.buffer, req.file.size);
        }   
        catch (err) {
            console.log(err);
            throw new CustomError.InternalServerError('Failed to upload image');
        }

        const newClass = new Class({
            className,
            image: imageName,
            createdBy: req.user.userId 
        })

        await newClass.save()

        newClass.image = classImagesContainerClient.url + '/' + imageName;

        res.status(201).json({
            message: 'Class created successfully',
            data: newClass
        })

    } catch (err) {
        next(err)
    }

}

exports.getAllClass = async (req, res, next) => {
    try {
        const classes = await Class.find()

        const classWithImage = classes.map(cls => {
            return {
                _id: cls._id,
                className: cls.className,
                image: classImagesContainerClient.url + '/' + cls.image
            }
        })

        res.status(200).json({ data: classWithImage })
    } catch (err) {
        next(err)
    }
}

exports.getClass = async (req, res, next) => {
    const { classId } = req.params

    try {
        const findClass = await Class.findById({ _id: classId })

        if (!findClass) {
            throw new CustomError.NotFoundError('Class not found');
        }

        findClass.image = classImagesContainerClient.url + '/' + findClass.image;

        res.status(200).json({ data: findClass })
    } catch (err) {
        next(err)
    }
}

exports.updateClass = async (req, res, next) => {
    const { classId } = req.params
    const { className, imageId } = req.body
    try {
        const findClass = await Class.findById({ _id: classId })

        if (!findClass) {
            throw new CustomError.NotFoundError('Class not found');
        }

        if (findClass.className != className) {
            const alreadyExistClassName = await Class.findOne({ className })

            if (alreadyExistClassName) {
                throw new CustomError.BadRequestError('Class name already exist');
            }
        }
        let newImageName ;
        if (req.file) {
            const imageName = imageId.split('/').pop();
            const delteBlockBlobClient = classImagesContainerClient.getBlockBlobClient(imageName);
            await delteBlockBlobClient.delete()

             newImageName = `${Date.now()}-${req.file.originalname}`;
            const uploadBlockBlobClient = classImagesContainerClient.getBlockBlobClient(newImageName);

            try {
                await uploadBlockBlobClient.upload(req.file.buffer, req.file.size);
            }
            catch (err) {
                throw new CustomError.InternalServerError('Failed to upload image');
            }

        }
        const updateData = req.file ? { className, image: newImageName } : { className }

        const updatedClass = await Class.findByIdAndUpdate({ _id: classId }, updateData, { new: true })

        updatedClass.image = classImagesContainerClient.url + '/' + updatedClass.image;
        res.status(200).json({ data: updatedClass, message: 'Class updated successfully' })

    } catch (err) {
        next(err)
    }
}


exports.deleteClass = async (req, res, next) => {
    const { classId } = req.params
    const { image } = req.body

    try {
        const findClass = await Class.findById({ _id: classId })

        if (!findClass) {
            throw new CustomError.NotFoundError('Class not found');
        }
        const imageName = findClass.image;
        const delteBlockBlobClient = classImagesContainerClient.getBlockBlobClient(imageName);

        await delteBlockBlobClient.delete()

        const materials = await Material.find({ class: classId });
        const materialIds = materials.map(material => material._id);
        const deleteMaterialSliders = await Slider.deleteMany({ material: { $in: materialIds } });
        const deleteReports = await Report.deleteMany({ postId: { $in: materialIds } });
        const deleteMaterials = await Material.deleteMany({ class: classId });
        const deleteSliders = await Slider.deleteMany({ class: classId });
        

        console.log('deleteMaterialSliders', deleteSliders);
        console.log('deleteMaterials', deleteMaterials);
        console.log('deleteSliders', deleteSliders);
        const deletedClass = await Class.findByIdAndDelete({ _id: classId }, { new: true })

        res.status(200).json({ message: 'Class deleted successfully', data: deletedClass })

    } catch (err) {
        next(err)
    }

}

exports.createClassSubject = async (req, res, next) => {
    const { classId, subjectId } = req.params

    try {
        if (mongoose.Types.ObjectId.isValid(subjectId) === false || mongoose.Types.ObjectId.isValid(classId) === false) {
            throw new CustomError.BadRequestError('Invalid Id');
        }

        const findClass = await Class.findById({ _id: classId })
        if (!findClass) {
            throw new CustomError.NotFoundError('Class not found');
        }

        const findSubject = await Subject.findById({ _id: subjectId })

        if (!findSubject) {
            throw new CustomError.NotFoundError('Subject not found');
        }


        if (findClass.subjects.includes(subjectId)) {
            throw new CustomError.BadRequestError('Subject already exist in class');
        }

        const subjects = [...findClass.subjects, subjectId];
        await Class.findByIdAndUpdate({ _id: classId }, { subjects }, { new: true })



        findSubject.image = subjectImagesContainerClient.url + '/' + findSubject.image;
        res.status(200).json({ data: findSubject, message: 'Class subject created successfully ' })
    } catch (err) {
        next(err)
    }
}

exports.getClassSubjects = async (req, res, next) => {
    const { classId } = req.params
    try {
        const findClass = await Class.findById({ _id: classId })

        if (!findClass) {
            throw new CustomError.NotFoundError('Class not found');
        }


        const AllSubjects = await Promise.all(findClass.subjects.map(async (subjectId) => {
            try {
                const subject = await Subject.findById(subjectId.toString());
               
                subject.image = subjectImagesContainerClient.url + '/' + subject.image;
                return subject;
            } catch (err) {
                return null;
            }
        }));


      




        res.status(200).json({ data: AllSubjects })
    } catch (err) {
        next(err)
    }
}

exports.deleteClassSubject = async (req, res, next) => {
    const { subjectId, classId } = req.params

    try {
        if (mongoose.Types.ObjectId.isValid(subjectId) === false || mongoose.Types.ObjectId.isValid(classId) === false) {
            throw new CustomError.BadRequestError('Invalid Id');

        }
        const findClass = await Class.findById({ _id: classId })
        if (!findClass) {
            throw new CustomError.NotFoundError('Class not found');
        }

        if (!findClass.subjects.includes(subjectId)) {
            throw new CustomError.NotFoundError('Subject does not exist in class');
        }


        const findSubject = await Subject.findById({ _id: subjectId })

        await Class.findByIdAndUpdate(classId, { $pull: { subjects: subjectId } }, { new: true })

        res.status(200).json({ data: findSubject, message: 'Class subject deleted successfully' })
    } catch (err) {
        next(err)
    }
}
