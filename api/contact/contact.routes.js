const express = require('express')
const router = express.Router()

const { createNewContact } = require('./contact.controller')



router.post('/',createNewContact)

module.exports = router
