const Support = require('../models/support_model');
const User = require('../models/user_model');
const CustomError = require('../errors');

exports.createSupport = async(req, res,next) => {
    const { title, message } = req.body;

    try{
        if(!title || !message){
            throw new CustomError('Please provide all the required fields')
        }

        const support = new Support({
            title,
            message,
            userId:req.user.userId 
        });

        const createSupport =await support.save();
        res.status(201).send({data:createSupport, message:'Support created successfully'})
    }catch(err){
        next(err)
    }

}

exports.getAllSupports = async(req, res,next) => {
    try{
        const supports = await Support.find({ isSolved: false });
        
        const supportWithUser = await Promise.all(supports.map(async(support) => {
            const user =await User.findById({_id:support.userId})
            return {
                _id:support._id,
                title:support.title,
                message:support.message,
                createdAt:support.createdAt,
                user:{
                    _id:user._id,
                    username : user.username,
                    email:user.email
                }
               
            }
        }
        ))

        res.status(200).send({data:supportWithUser})
    }catch(err){
        next(err)
    }
}

exports.deleteSupport = async(req, res,next) => {
    const {supportId} = req.params;
    try{
        const support = await Support.findById({_id:supportId})
        
        if(!support){
            throw new CustomError('Support not found')
        }

        const deleteSupport = await Support.findByIdAndDelete({_id:supportId}, {new:true})

        res.status(200).send({data:deleteSupport, message:'Support deleted successfully'})
    }
    catch(err){
        next(err)
    }

}


exports.solveSupport = async(req, res,next) => {
    const {supportId} = req.params;
    try{
        const support = await Support.findById({_id:supportId})
        
        if(!support){
            throw new CustomError('Support not found')
        }

        const solveSupport = await Support.findByIdAndUpdate({_id:supportId}, {isSolved:true}, {new:true})

        res.status(200).send({data:solveSupport, message:'Support solved successfully'})
    }
    catch(err){
        next(err)
    }

}