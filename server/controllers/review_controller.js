const Review = require('../models/review_model');

const CustomError = require('../errors');
const  User  = require('../models/user_model');


exports.createReview = async(req, res,next) => {
    const { comment, rating, } = req.body;

    try{
        

        const review = new Review({
            comment,
            rating,
            userId:req.user.userId 
        });


      


        const createReview =await review.save();
        res.status(201).send({data:createReview, message:'Review created successfully'})
    }catch(err){
        next(err)
    }

}

exports.getAllReviews = async(req, res) => {
    try{
        const reviews = await Review.find()


        const reviewsWithUser =await Promise.all(reviews.map(async (review) => {
           const user =await User.findById({_id:review.userId})

              return {
                _id:review._id,
                comment:review.comment,
                rating:review.rating,
                createdAt:review.createdAt,
                user:{
                    _id:user._id,
                    username:user.username,
                    email:user.email
              }
        }
        }
        ))

        res.status(200).send({data:reviewsWithUser})
    }catch(err){
        next(err)
    }
}

exports.deleteReview = async(req, res,next) => {
    const {reviewId} = req.params;
    try{
        const review = await Review.findById({_id:reviewId})
     
        if(!review){
            throw new CustomError('Review not found')
        }

        const deleteReview = await Review.findByIdAndDelete({_id:reviewId}, {new:true})
        res.status(200).send({data:deleteReview, message:'Review deleted successfully'})
    }
    catch(err){
        next(err)
    }

}