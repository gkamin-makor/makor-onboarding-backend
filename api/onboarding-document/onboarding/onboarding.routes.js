const express = require('express')
const router = express.Router()

const {getOnBoarding,updateOnBoarding} = require('./onboarding.controller')


router.get('/:id', getOnBoarding )
router.put('/:id', updateOnBoarding )

module.exports = router
