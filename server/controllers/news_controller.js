const News = require('../models/news_model');
const CustomError = require('../errors');
const { newsImageContainerClient,newsContentImagesContainerClient} = require('../services/azure/azureService');
const { find } = require('../models/category_model');
const Slider = require('../models/slider_model');
const Report = require('../models/report_model');


exports.createNews = async(req, res,next) => {
    const { title, content,languageId, categoryId,newsImages } = req.body;

   try{
    if(!title || !content || !languageId || !categoryId ){
        throw new CustomError.BadRequestError('Please provide all the required fields')
    }
let newsImageNames = [];
    if(newsImages){
        const newsImageUrls = newsImages.split(',');
 newsImageNames = newsImageUrls.map((url) => {
    return url.split('/').pop();
});
    }

    const findNews = await News.findOne({title})
    if(findNews){
        throw new CustomError.BadRequestError('News with this title already exists')
    }

    const imageName = `${Date.now()}-${req.file.originalname}`;
    const blobClient = newsImageContainerClient.getBlockBlobClient(imageName);
     try{
        await blobClient.upload(req.file.buffer,req.file.size);
     }  catch(err){
        console.log(err);
        throw new CustomError.BadRequestError('Error in uploading image')
     }
     
    const news = new News({
        title,
        content,
        newsImages:newsImageNames,
        language:languageId,
        image:imageName,
        category:categoryId,
        createdBy:req.user.userId 
    });

    const createdNews =await news.save();
    news.image = `${newsImageContainerClient.url}/${imageName}`;
    res.status(201).send({data:createdNews, message:'News created successfully'})
   }catch(err){
    next(err)
}
}

exports.getAllNews = async(req, res) => {
    try{
        const news = await News.find();
          

       const newsWithImage = news.map((news) => {
              news.image = `${newsImageContainerClient.url}/${news.image}`;
              return news;
            })



        res.status(200).send({data:newsWithImage})
    }catch(err){
        next(err)
    }
}

exports.getNews = async(req, res,next) => {
    const { newsId} = req.params;

    try{
        const findNews = await News.findOne({_id:newsId})
        if(!findNews){
            throw new CustomError.BadRequestError('News with this id does not exists')
        }

        findNews.image = `${newsImageContainerClient.url}/${findNews.image}`;
      if(findNews.newsImages.length > 0){
        const newsImages = findNews.newsImages.map((image) => {
            return `${newsContentImagesContainerClient.url}/${image}`
        })
        findNews.newsImages = newsImages;
        }
        res.status(200).send({data:findNews})
    }catch(err){
        next(err)
    }
}


exports.updateNews = async(req, res,next) => {
    const { title, content,languageId, categoryId,newsImages,deletedImages } = req.body;
    const { newsId} = req.params;

    try{
        
    
        const findNews = await News.findOne({_id:newsId})
        if(!findNews){
            throw new CustomError.BadRequestError('News with this id does not exists')
        }
        
       
        if(deletedImages.length > 0){
            const deletedImageNames = deletedImages.split(',');
            deletedImageNames.forEach(async(image) => {
                const imageName = image.split('/').pop()
                const deleteBlobClient = newsContentImagesContainerClient.getBlockBlobClient(imageName);
                await deleteBlobClient.delete();
            })
        }


        let newImageName;
        if(req.file){
            const imageName = findNews.image;
        const deleteBlobClient = newsImageContainerClient.getBlockBlobClient(imageName);
        await deleteBlobClient.delete();

         newImageName = `${Date.now()}-${req.file.originalname}`;
        const blobClient = newsImageContainerClient.getBlockBlobClient(newImageName);
         try{
            await blobClient.upload(req.file.buffer,req.file.size);
         }  catch(err){
            throw new CustomError.BadRequestError('Error in uploading image')
         }
        }

        let newsImageName = [];
if(newsImages){
    const newsImageUrls = newsImages.split(',')
     newsImageName = newsImageUrls.map((url)=>{
        return url.split('/').pop()
    })
}

        const updateData = req.file ? {title, content,language:languageId,newsImages:newsImageName, category:categoryId,image:newImageName} : {title, content,language:languageId,newsImages:newsImageName, category:categoryId};
    
        const updatedNews = await News.findByIdAndUpdate({_id:newsId}, updateData,{new:true})
      
        updatedNews.image = `${newsImageContainerClient.url}/${updatedNews.image}`;
        res.status(201).send({data:updatedNews, message:'News updated successfully'})
       }catch(err){
        next(err)
    }
}


exports.deleteNews = async(req, res,next) => {
    const { newsId} = req.params;
    const {image} = req.body

    try{
        const findNews = await News.findOne({_id:newsId})
        if(!findNews){
            throw new CustomError.BadRequestError('News with this id does not exists')
        }

        const imageName =findNews.image;
        const deleteBlobClient = newsImageContainerClient.getBlockBlobClient(imageName);
        await deleteBlobClient.delete();

        const newsImages = findNews.newsImages;
        if(newsImages.length > 0){
            newsImages.forEach(async(image) => {
                const deleteBlobClient = newsContentImagesContainerClient.getBlockBlobClient(image);
                await deleteBlobClient.delete();
            })
        }

        const deletedSlider = await Slider.deleteMany({news:newsId})
        const deleteReports = await Report.deleteMany({postId:newsId})

        console.log('deletedSlider',deletedSlider);

        const deletedNews = await News.findByIdAndDelete({_id:newsId})
        res.status(200).send({data:deletedNews,message:'News deleted successfully'})
    }catch(err){
        next(err)
    }


}

exports.statusUpdate = async(req, res,next) => {
    const { newsId} = req.params;
    const { status } = req.body;

    try{
      

        const findNews = await News.findOne({_id:newsId})
        if(!findNews){
            throw new CustomError.BadRequestError('News with this id does not exists')
        }

        const updatedNews = await News.findByIdAndUpdate({_id:newsId}, {status},{new:true})
        updatedNews.image = `${newsImageContainerClient.url}/${updatedNews.image}`;
        res.status(200).send({data:updatedNews, message:'News status updated successfully'})
    }catch(err){
        next(err)
    }
}


exports.newsImageUpload = async(req, res,next) => {


    try{
        const imageName = `${Date.now()}-${req.file.originalname}`;
        const blobClient = newsContentImagesContainerClient.getBlockBlobClient(imageName);
         try{
            await blobClient.upload(req.file.buffer,req.file.size);
         }  catch(err){
            throw new CustomError.BadRequestError('Error in uploading image')
         }
         res.status(200).send({url:`${newsContentImagesContainerClient.url}/${imageName}`})
    }
    catch(err){
        next(err)
    }

}

exports.newsImageDelete = async(req, res,next) => {
    const url = req.query.url;
console.log(url);
    try{

        if(!url){
            throw new CustomError.BadRequestError('Please provide image name')
        }

        const imageName =  url.split('/').pop();
        const deleteBlobClient = newsContentImagesContainerClient.getBlockBlobClient(imageName);
        await deleteBlobClient.delete();
        res.status(200).send({message:'Image deleted successfully'})
    }catch(err){
        next(err)
    }

}