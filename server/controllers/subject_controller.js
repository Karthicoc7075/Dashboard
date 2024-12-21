const Subject = require('../models/subject_model');
const CustomError = require('../errors');
const { subjectImagesContainerClient } = require('../services/azure/azureService');
const Class = require('../models/class_model');
const Material = require('../models/material_model');
const Slider = require('../models/slider_model');

exports.createSubject = async (req, res,next) => {
    const { subjectName } = req.body;
    try {
        if(!subjectName  ){
            throw new CustomError.BadRequestError('All fields are required');
        }

        const subjectExist = await Subject.findOne({ subjectName });

        if (subjectExist) {
            throw new CustomError.BadRequestError('Subject name already exist');
        }

        const imageName = `${Date.now()}-${req.file.originalname}`;
            const blockBlobClient = subjectImagesContainerClient.getBlockBlobClient(imageName);
        
            try{
                await blockBlobClient.upload(req.file.buffer, req.file.size);
            }
            catch(err){
                throw new CustomError.InternalServerError('Failed to upload image');
            }

        const createSubject = await Subject.create({ subjectName,image:imageName, createdBy: req.user.userId });
        createSubject.image = subjectImagesContainerClient.url + '/' + createSubject.image;
        res.status(201).json({ data: createSubject, message: 'Subject created successfully' });
    } catch (err) {
        next(err);
    }
}

exports.getSubject = async (req, res,next) => {
    const { subjectId } = req.params;
    try {
        const subject = await Subject.findOne({ _id: subjectId });
        if (!subject) {
            throw new CustomError.NotFoundError('Subject not found');
        }
        subject.image = subjectImagesContainerClient.url + '/' + subject.image;
        res.status(200).json({ data: subject });
    } catch (err) {
        next(err);
    }
}



exports.getAllSubjects = async (req, res,next) => {
    try {
        console.log('get all subjects');
        const subjects = await Subject.find();
        
        const subjectsWithImage = subjects.map(subject => {
            return {
                _id: subject._id,
                subjectName: subject.subjectName,
                image: subjectImagesContainerClient.url + '/' + subject.image
            }
        })
         
        res.status(200).json({ data: subjectsWithImage });
    } catch (err) {
        next(err);
    }
}

exports.updateSubject = async (req, res,next) => {
    const { subjectId } = req.params;
    const { subjectName,imageId } = req.body;
    console.log(req.body.subjectName);
    try {
        if(!subjectName){
            throw new CustomError.BadRequestError('All fields are required');
        }
        
        const findSubject = await Subject.findOne({ _id: subjectId })
    
        if (!findSubject) {
           throw new CustomError.NotFoundError('Subject not found');
        }

        if(findSubject.subjectName != subjectName){
            const alreadyExistSubjectName = await Subject.findOne({ subjectName })

            if (alreadyExistSubjectName) {
                throw new CustomError.BadRequestError('Subject name already exist');
            }
        }
        
        let newImageName;
       if(req.file){
         
        const imageName =  imageId.split('/').pop();
        const delteBlockBlobClient = subjectImagesContainerClient.getBlockBlobClient(imageName);
        await delteBlockBlobClient.delete()

        newImageName = `${Date.now()}-${req.file.originalname}`;
        const uploadBlockBlobClient = subjectImagesContainerClient.getBlockBlobClient(newImageName);
    
        try{
            await uploadBlockBlobClient.upload(req.file.buffer, req.file.size);
        }
        catch(err){
            throw new CustomError.InternalServerError('Failed to upload image');
        }
    }

        const updateData = req.file ? { subjectName, image:newImageName } : { subjectName }

        const updatedSubject = await Subject.findByIdAndUpdate({ _id: subjectId },  updateData, { new: true })
         
        updatedSubject.image = subjectImagesContainerClient.url + '/' + updatedSubject.image;
        
        

        res.status(200).json({ data: updatedSubject, message: 'Subject updated successfully' });

    } catch (err) {
        next(err);
    }

}

exports.deleteSubject = async (req, res,next) => {
    const { subjectId } = req.params;
    const { image } = req.body;
    try {
        const subject = await Subject.findOne({ _id: subjectId })
        if (!subject) {
           throw new CustomError.NotFoundError('Subject not found');
        }
      

        // const imageName =  subject.image
        // const deleteBlockBlobClient = subjectImagesContainerClient.getBlockBlobClient(imageName);
        // await deleteBlockBlobClient.delete()

        const deletedClassSubject = await Class.updateMany({ subjects: subjectId }, { $pull: { subjects: subjectId } }, { new: true });
        const materials = await Material.find({ subject: subjectId });
        const materialIds = materials.map(material => material._id);
        const deleteMaterialSliders = await Slider.deleteMany({ material: { $in: materialIds } });
        const deleteMaterials =   await Material.deleteMany({ subject: subjectId });

      console.log('deleteMaterialSliders', deleteMaterialSliders);
      console.log('deleteMaterials', deleteMaterials);
        console.log('deleteClassSubject', deletedClassSubject);
        const deletedSubject = await Subject.findByIdAndDelete({ _id: subjectId }, { new: true })
        res.status(200).json({ message: 'Subject deleted successfully', data: deletedSubject })

    } catch (err) {
        next(err);
    }
}
