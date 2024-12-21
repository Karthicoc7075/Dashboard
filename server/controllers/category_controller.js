const Category = require('../models/category_model');
const News = require('../models/news_model');
const CustomError = require('../errors');
const { categoryImagesContainerClient, newsImageContainerClient } = require('../services/azure/azureService');
const Report = require('../models/report_model');

exports.createCategory = async (req, res, next) => {
    const { categoryName } = req.body;
    try {
        if (!categoryName) {
            throw new CustomError.BadRequestError('All fields are required');
        }

        const CategoryExist = await Category.findOne({ categoryName });

        if (CategoryExist) {
            throw new CustomError.BadRequestError('Category name already exist');
        }

        const imageName = `${Date.now()}-${req.file.originalname}`;
        const blockBlobClient = categoryImagesContainerClient.getBlockBlobClient(imageName);

        try {
            await blockBlobClient.upload(req.file.buffer, req.file.size);
        }
        catch (err) {
            throw new CustomError.BadRequestError('Failed to upload image');
        }

        const createCategory = await Category.create({ categoryName, image: imageName, createdBy: req.user.userId });
        createCategory.image = categoryImagesContainerClient.url + '/' + createCategory.image;
        res.status(201).json({ data: createCategory, message: 'Category created successfully' });
    } catch (err) {
        next(err);
    }
}

exports.getCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    try {
        const findCategory = await Category.findOne({ _id: categoryId })
        if (!findCategory) {
            throw new CustomError.NotFoundError('Category not found');
        }
        findCategory.image = categoryImagesContainerClient.url + '/' + findCategory.image;

        res.status(200).json({ data: findCategory });
    } catch (err) {
        next(err);
    }
}

exports.getAllCategory = async (req, res, next) => {
    try {

        const categorys = await Category.find();

        const categorysWithImage = categorys.map(category => {
            return {
                _id: category._id,
                categoryName: category.categoryName,
                image: categoryImagesContainerClient.url + '/' + category.image
            }
        })

        res.status(200).json({ data: categorysWithImage });
    } catch (err) {
        next(err);
    }
}

exports.updateCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    const { categoryName, imageId } = req.body;

    try {
        if (!categoryName) {
            throw new CustomError.BadRequestError('All fields are required');
        }

        const findCategory = await Category.findOne({ _id: categoryId })

        if (!findCategory) {
            throw new CustomError.NotFoundError('Category not found');
        }

        if (findCategory.categoryName != categoryName) {
            const alreadyExistCategoryName = await Category.findOne({ categoryName })

            if (alreadyExistCategoryName) {
                throw new CustomError.BadRequestError('Category name already exist');
            }
        }

        let newImageName

        if (req.file) {

            const imageName = imageId.split('/').pop();
            const delteBlockBlobClient = categoryImagesContainerClient.getBlockBlobClient(imageName);
            await delteBlockBlobClient.delete()

            newImageName = `${Date.now()}-${req.file.originalname}`;
            const uploadBlockBlobClient = categoryImagesContainerClient.getBlockBlobClient(newImageName);

            try {
                await uploadBlockBlobClient.upload(req.file.buffer, req.file.size);
            }
            catch (err) {
                throw new CustomError.InternalServerError('Failed to upload image');
            }
        }

        const updateData = req.file ? { categoryName, image: newImageName } : { categoryName }

        const updatedCategory = await Category.findByIdAndUpdate({ _id: categoryId }, updateData, { new: true })

        updatedCategory.image = categoryImagesContainerClient.url + '/' + newImageName;

        res.status(200).json({ data: updatedCategory, message: 'Category updated successfully' });

    } catch (err) {
        next(err);
    }

}

exports.deleteCategory = async (req, res, next) => {
    const { categoryId } = req.params;

    try {
        const findCategory = await Category.findOne({ _id: categoryId })
        if (!findCategory) {
            throw new CustomError.NotFoundError('Category not found');
        }

        const imageName = findCategory.image;
        const deleteBlockBlobClient = categoryImagesContainerClient.getBlockBlobClient(imageName);
        await deleteBlockBlobClient.delete()

          const news = await News.find({ category: categoryId })
        const newsIds = news.map(news => news._id)
        const deletedSlider = await News.deleteMany({ _id: { $in: newsIds } })
        const deletedReports = await Report.deleteMany({postId: { $in: newsIds } })
        const deletedNews = await News.deleteMany({ category: categoryId })
        
            
            console.log('deletedSlider', deletedSlider)
        console.log('deletedReports', deletedReports);
            console.log('deletedNews', deletedNews);

        const deletedClass = await Category.findByIdAndDelete({ _id: categoryId }, { new: true })
        res.status(200).json({ message: 'Category deleted successfully', data: deletedClass })

    } catch (err) {
        next(err);
    }
}
