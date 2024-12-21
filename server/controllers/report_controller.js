const Report = require('../models/report_model');

const CustomError = require('../errors');


exports.createReport = async(req, res,next) => {    
    const { postId, desc } = req.body;

    try{
        if(!postId || !desc){
            throw new CustomError.BadRequestError('Please provide all the required fields')
        }

        const report = new Report({
            postId,
            description:desc,
            userId:req.user.userId 
        });

        const createReport =await report.save();
        res.status(201).send({data:createReport, message:'Report created successfully'})
    }catch(err){
        next(err)
    }
}

exports.getAllReports = async(req, res,next) => {
    try{
        const reports = await Report.find().populate('postId', '_id title')



        res.status(200).send({data:reports})
    }catch(err){
        next(err)
    }
}


exports.solveReport = async(req, res,next) => {
    const {reportId} = req.params;
    try{
        const report = await Report.findById({_id:reportId})
        
        if(!report){
            throw new CustomError.BadRequestError('Report not found')
        }

        const solveReport = await Report.findByIdAndUpdate({_id:reportId}, {isSolved:true}, {new:true})

        res.status(200).send({data:solveReport, message:'Report solved successfully'})
    }
    catch(err){
        next(err)
    }

}


exports.deleteReport = async(req, res,next) => {
    const {reportId} = req.params;
    try{
        const report = await Report.findById({_id:reportId})
        
        if(!report){
            throw new CustomError.BadRequestError('Report not found')
        }

        const deleteReport = await Report.findByIdAndDelete({_id:reportId}, {new:true})

        res.status(200).send({data:deleteReport, message:'Report deleted successfully'})
    }
    catch(err){
        next(err)
    }

}

