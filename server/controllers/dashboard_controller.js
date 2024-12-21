const User = require('../models/user_model');
const Class = require('../models/class_model');
const Subject = require('../models/subject_model');
const Material = require('../models/material_model');
const Medium = require('../models/medium_model');
const Language = require('../models/language_model');
const Category = require('../models/category_model');
const News = require('../models/news_model');
const Notification = require('../models/notification_model');
const Slider = require('../models/slider_model');
const Review = require('../models/review_model');
const Support = require('../models/support_model');
const Report = require('../models/report_model');
const Version = require('../models/version_model');


exports.getDashboardData = async(req, res) => {
    try {

        

        const dashboardData = {
            totalUsers: await User.countDocuments(),
            totalClasses: await Class.countDocuments(),
            totalSubjects: await Subject.countDocuments(),
            totalMaterials: await Material.countDocuments(),
            totalMediums: await Medium.countDocuments(),
            totalLanguages: await Language.countDocuments(),
            totalCategories: await Category.countDocuments(),
            totalNews: await News.countDocuments(),
            totalNotifications: await Notification.countDocuments(),
            totalSliders: await Slider.countDocuments(),
            totalReviews: await Review.countDocuments(),
            totalPendingSupports: await Support.countDocuments({isSolved: false}),
            totalReports: await Report.countDocuments(),
            totalVersions: await Version.countDocuments(),
        };
        res.status(200).json({ data: dashboardData });
    } catch (err) {
        next(err);
    }
}