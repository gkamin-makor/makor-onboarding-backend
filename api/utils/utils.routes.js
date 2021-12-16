const express = require('express')
const router = express.Router()

const {getCountries,getStates,getPositions,getRegulator,getCompany,getProducts,getDialcodes} = require('./utils.controller')

router.get('/country',getCountries)
router.get('/state',getStates)
router.get('/position',getPositions)
router.get('/regulator', getRegulator)
router.get('/company', getCompany)
router.get('/assets/:name', getProducts)
router.get('/dialcodes', getDialcodes)

module.exports = router
