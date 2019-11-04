// model
const mongoose = require('mongoose')
const mime = require('mime-types')
require('dotenv').config()

const uploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  actualFile: {
    type: mime.lookup(this.fileName, this.fileType),
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
})

// Virtual property that generates the file URL location
uploadSchema.virtual('fileUrl').get(function () {
  // generating
  const url = 'https://' + process.env.BUCKET_Name + '.s3.amazonaws.com/' + this.fileName
  // return the value
  return url
})

module.exports = mongoose.model('Upload', uploadSchema)
