const {AdsSettings,AppSettings} = require('../models/setting_model');
const CustomError = require('../errors');


exports.getAdsSettings = async(req, res) => {
    try{
        const adsSettings = await AdsSettings.find();
        const data = adsSettings[0]
        res.status(200).send({data})
    }catch(err){
        next(err)
    }
}

exports.getAppSettings = async(req, res) => {

    try{
        const appSettings = await AppSettings.find();
        const data = appSettings[0]
        res.status(200).send({data})

    }catch(err){
        next(err)
    }
}


exports.createAppSettings = async(req, res,next) => {
    const { appName,maintanceMode,firebaseLegacyServerKey,appLink,privacyPolicy } = req.body;
    try{
        if(!appName  || !firebaseLegacyServerKey || !appLink || !privacyPolicy){
            throw new CustomError.BadRequestError('Please provide all the required fields')
        }


        const setting = new AppSettings({ appName,maintanceMode,firebaseLegacyServerKey,appLink,privacyPolicy});
         
    

        const createSetting =await setting.save();
        res.status(201).send({data:createSetting, message:'App Setting  created successfully'})
    }
    catch(err){
        next(err)
    }
}


exports.createAdsSettings = async(req, res,next) => {
    const { adsStatus,admobBannerId,facebookBannerId,interstitialType,interstitialClickCount,admobNativeId,facebookNativeId,nativeType,nativeCount} = req.body;

    try{
        if(!adsStatus || !admobBannerId || !facebookBannerId || !interstitialType || !interstitialClickCount || !admobNativeId || !facebookNativeId || !nativeType || !nativeCount){
            throw new CustomError.BadRequestError('Please provide all the required fields')
        }
        const setting = new AdsSettings({adsStatus,admobBannerId,facebookBannerId,interstitialType,interstitialClickCount,admobNativeId,facebookNativeId,nativeType,nativeCount});
         
    

        const createSetting =await setting.save();
        res.status(201).send({data:createSetting, message:'Ads Setting  created successfully'})
    }
    catch(err){
        next(err)
    }
}




exports.updateAppSettings = async(req, res,next) => {
    const {settingId} = req.params;
    const { appName,maintanceMode,firebaseLegacyServerKey,appLink,privacyPolicy } = req.body;

    try{

        if(!appName === ''  || !firebaseLegacyServerKey === '' || !appLink === '' || !privacyPolicy === ''   ){
            throw new CustomError.BadRequestError('All fields required')
        }


        const setting = await AppSettings.findByIdAndUpdate({_id:settingId},{ appName,maintanceMode,firebaseLegacyServerKey,appLink,privacyPolicy},{new:true,runValidators:true})

        if(!setting){
            throw new CustomError.NotFoundError('App Setting not found')
        }

        res.status(200).send({data:setting})
    }catch(err){
        next(err)
    }
}

exports.updateAdsSettings = async(req, res,next) => {
    const {settingId} = req.params;
    const { adsStatus,admobBannerId,facebookBannerId,interstitialType,interstitialClickCount,admobNativeId,facebookNativeId,nativeType,nativeCount } = req.body;
console.log(req.body);
    try{

        if(!adsStatus || !admobBannerId || !facebookBannerId || !interstitialType || !interstitialClickCount || !admobNativeId || !facebookNativeId || !nativeType || !nativeCount){
            throw new CustomError.BadRequestError('All fields required')
        }


        const setting = await AdsSettings.findByIdAndUpdate({_id:settingId},{adsStatus,admobBannerId,facebookBannerId,interstitialType,interstitialClickCount,admobNativeId,facebookNativeId,nativeType,nativeCount },{new:true,runValidators:true})

        if(!setting){
            throw new CustomError.NotFoundError('Ads Setting not found')
        }

        res.status(200).send({data:setting})
    }catch(err){
        next(err)
    }
}

