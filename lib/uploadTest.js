require('dotenv').config()
// Require File System
const fs = require('fs')

// Require AWS SDK
const AWS = require('aws-sdk')

// Set AWS region
AWS.config.update({region: 'us-east-1'})

// Create S3 Object instance
const s3 = new AWS.S3()
console.log(s3)

// Access command line arguemtns to get file path
const filePath = process.argv[2]

// Define bucket based on envirment variable
const bucketName = process.env.BUCKET_NAME
console.log(bucketName)

// Read the file first
fs.readFile(filePath, (err, fileData) => {
  if (err) throw err
  console.log('this is fileData: ', fileData)

  // Create params object for s3 upload
  const params = {
    Bucket: bucketName,
    Key: 'something',
    Body: fileData,
    ACL: 'public-read'
  }

  // Upload to s3
  s3.upload(params, (err, s3Data) => {
    if (err) throw err
    console.log('this is s3Data: ', s3Data)
  })
})
