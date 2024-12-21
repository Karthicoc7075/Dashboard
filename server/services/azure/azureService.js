const { BlobServiceClient} = require('@azure/storage-blob')
const azureConfig = require('../../config/azureConfig');

const blobServiceClient = BlobServiceClient.fromConnectionString(azureConfig.connectionString);

const classImagesContainerClient = blobServiceClient.getContainerClient(azureConfig.classImagesContainer);
const subjectImagesContainerClient = blobServiceClient.getContainerClient(azureConfig.subjectImagesContainer);
const materialContainerClient = blobServiceClient.getContainerClient(azureConfig.materialContainer);
const materialImagesContainerClient = blobServiceClient.getContainerClient(azureConfig.materialImagesContainer);
const mediumImagesContainerClient = blobServiceClient.getContainerClient(azureConfig.mediumImagesContainer);
const languageImagesContainerClient = blobServiceClient.getContainerClient(azureConfig.languageImagesContainer);
const categoryImagesContainerClient = blobServiceClient.getContainerClient(azureConfig.categoryImagesContainer);
const newsImageContainerClient = blobServiceClient.getContainerClient(azureConfig.newsImagesContainer);
const newsContentImagesContainerClient = blobServiceClient.getContainerClient(azureConfig.newsContentImagesContainer);
const notificationImageContainerClient = blobServiceClient.getContainerClient(azureConfig.notificationImageContainer);
const sliderImageContainerClient = blobServiceClient.getContainerClient(azureConfig.sliderImageContainer);

module.exports = {
    classImagesContainerClient,
    subjectImagesContainerClient,
    materialImagesContainerClient,
    materialContainerClient,
    mediumImagesContainerClient,
    languageImagesContainerClient,
    categoryImagesContainerClient,
    newsImageContainerClient,
    newsContentImagesContainerClient,
    notificationImageContainerClient,
    sliderImageContainerClient
}
