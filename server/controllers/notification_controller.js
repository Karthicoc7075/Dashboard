const Notification = require('../models/notification_model');
const CustomError = require('../errors');
const { notificationImageContainerClient } = require('../services/azure/azureService');

exports.createNotification = async(req, res,next) => {
    const { title, description } = req.body;

    try{
        if(!title || !description){
            throw new CustomError.BadRequestError('Please provide all the required fields')
        }

         const imageName = `${Date.now()}-${req.file.originalname}`;
        const blobClient = notificationImageContainerClient.getBlockBlobClient(imageName);
        try{
            await blobClient.upload(req.file.buffer,req.file.size);
        }  catch(err){
            console.log();
            throw new CustomError.BadRequestError('Error in uploading image')
        }

        const notification = new Notification({
            title,
            description,
            image:imageName,
            createdBy:req.user.userId
        });

        const createNotification =await notification.save();
        notification.image = `${notificationImageContainerClient.url}/${imageName}`;
        res.status(201).send({data:createNotification, message:'Notification created successfully'})
    }catch(err){
        next(err)
    }

}

exports.notifications = async(req, res,next) => {
   try{
        const notifications = await Notification.find().sort({createdAt:-1});

         notifications.forEach((notification) => {
            notification.image = `${notificationImageContainerClient.url}/${notification.image}`;
        });

        res.status(200).send({data:notifications})
   }catch(err){
    next(err)
   }
}

exports.deleteNotification = async(req, res,next) => {
    const { notificationId } = req.params;
    try{
        const notification = await Notification.findById(notificationId);
        if(!notification){
            throw new CustomError.NotFoundError('Notification not found')
        }

        const imageName = notification.image;
        const blobClient = notificationImageContainerClient.getBlockBlobClient(imageName);
        try{
            await blobClient.delete();
        }catch(err){
            throw new CustomError.BadRequestError('Error in deleting image')
        }
        

        const deleteNotification = await Notification.findByIdAndDelete(notificationId);

res.status(200).send({message:'Notification deleted successfully',data:deleteNotification})
    }catch(err){
        next(err)
    }
}