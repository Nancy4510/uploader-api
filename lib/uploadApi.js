require('dotenv').config()
const mime = require('mime-types')
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const s3 = new AWS.S3()
const bucketName = process.env.BUCKET_NAME

module.exports = function () {
  const params = {
    Bucket: bucketName,
    Key: 'something',
    Body: fileData,
    ACL: 'public-read',
    ContentType: mime.lookup(filePath)
  }

  // Upload to s3
  s3.upload(params, (err, s3Data) => {
    if (err) throw err
    console.log('this is s3Data: ', s3Data)
  })
}
