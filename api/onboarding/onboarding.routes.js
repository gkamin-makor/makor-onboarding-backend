const express = require('express')
const router = express.Router()

const {createOnBoarding,updateOnboarding,getOnboardingData,test} = require('./onboarding.controller')

router.post('/',createOnBoarding) // done
router.get('/:uuid',getOnboardingData) 
router.put('/:uuid',updateOnboarding)

module.exports = router
