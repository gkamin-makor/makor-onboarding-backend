const utilService = require('./utils.service')

async function getCountries(req, res) {
    try {

    const countries = await utilService.getCountries()

    res.status(200).send(countries)
      
     
    } catch (err) {
      res.status(500).send(err);
    }
  }

async function getStates(req, res) {
    try {

    const states = await utilService.getStates()

    res.status(200).send(states)
      


     
    } catch (err) {
      res.status(500).send(err);
    }
  }

async function getPositions(req, res) {
    try {

    const positions = await utilService.getPositions()

    res.status(200).send(positions)
      


     
    } catch (err) {
      res.status(500).send(err);
    }
  }
async function getRegulator(req, res) {
    try {

    const regulators = await utilService.getRegulators()

    res.status(200).send(regulators)
      


     
    } catch (err) {
      res.status(500).send(err);
    }
  }

async function getCompany(req, res) {
    try {

    const companies = await utilService.getCompanies()

    res.status(200).send(companies)
      


     
    } catch (err) {
      res.status(500).send(err);
    }
  }

async function getProducts(req, res) {
    try {

    const {name} = req.params


    const products = await utilService.getProducts(name)


    res.send(products)
      


     
    } catch (err) {
      res.status(500).send(err);
    }
  }

async function getDialcodes(req, res) {
    try {


    var codes = await utilService.getDialcodes()

      codes = codes.map(code => code.dialing_code )

    res.send(codes)
      


     
    } catch (err) {
      res.status(500).send(err);
    }
  }


  module.exports = {
    getCountries,
    getStates,
    getPositions,
    getRegulator,
    getCompany,
    getProducts,
    getDialcodes
    
  }