const express = require('express')
const router = express.Router()

const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./files')
    },

    filename: (req,file,cb) => {
        const filename = file.originalname + "," + Date.now() + path.extname(file.originalname)
        req.filename = filename
        cb(null, filename)
    }
})

const upload = multer({
    storage:storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf" || file.mimetype == "application/msword" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "text/plain") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only pdf/doc/docx/txt!'));
        }
      }
})

const {updateFileUpload,getFiles} = require('./file.controller')


router.post('/:id/:field',upload.single('file'), updateFileUpload )
router.get('/:id', getFiles )

module.exports = router
