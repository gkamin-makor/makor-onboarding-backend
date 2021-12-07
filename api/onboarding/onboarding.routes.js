const express = require('express')
const router = express.Router()

const {createOnBoarding,updateOnboarding} = require('./onboarding.controller')

router.post('/',createOnBoarding)
router.put('/:uuid',updateOnboarding)





module.exports = router
