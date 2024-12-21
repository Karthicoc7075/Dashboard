const https = require('https');

 const  getFileSize=(url)=> {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
          return;
        }
  
        const contentLength = response.headers['content-length'];
        if (!contentLength) {
          reject(new Error('Content length not found in the response headers'));
          return;
        }
  
        resolve(parseInt(contentLength, 10));
      }).on('error', (err) => {
        reject(err);
      });
    });
  }
  

  module.exports = getFileSize;