const mongoose  = require('mongoose');

const   appSettingsSchema = new mongoose.Schema({
          appName: {
             type: String,
             required: true
          },
          maintanceMode: {
             type: Boolean,
             default: false
          },
          firebaseLegacyServerKey: {
             type: String,
             required: true
          },
          appLink: {
             type: String,
             required: true
          },
          privacyPolicy: {
             type: String,
             required: true
          },
          updatedAt: {
             type: Date,
             default: Date.now
          },
          createdAt: {
             type: Date,
             default: Date.now
          }
});


const adsSettingsSchema = new mongoose.Schema({
    adsStatus: {
        type: Boolean,
        required: true
    },
    admobBannerId: {
        type: String,
        required: true
    },
    facebookBannerId: {
        type: String,
        required: true
    },
    interstitialType: {
        type: String,
        required: true
    },
    interstitialClickCount: {
        type: Number,
        required: true
    },
    admobNativeId: {
        type: String,
        required: true
    },
    facebookNativeId: {
        type: String,
        required: true
    },
    nativeType: {
        type: String,
        required: true
    },
    nativeCount: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const AdsSettings = mongoose.model('adsSettings', adsSettingsSchema);
const AppSettings = mongoose.model('appSettings', appSettingsSchema);

module.exports = { AppSettings, AdsSettings};

