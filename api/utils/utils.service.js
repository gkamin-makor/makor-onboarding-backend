const res = require("express/lib/response");
const dbService = require("../../services/db.service");
const queries = require('./utils.queries')

async function getCountries() {
  try {

    const countries = await dbService.runSQL(queries.select_countries())

    return countries


  
  } catch (err) {
    throw err;
  }
}

async function getStates() {
  try {

    const states = await dbService.runSQL(queries.select_states())

    return states


  
  } catch (err) {
    throw err;
  }
}

async function getPositions() {
  try {

    const positions = await dbService.runSQL(queries.select_positions())

    return positions


  
  } catch (err) {
    throw err;
  }
}

async function getRegulators() {
  try {

    const regulators = await dbService.runSQL(queries.select_regulators())

    return regulators


  
  } catch (err) {
    throw err;
  }
}
async function getCompanies() {
  try {

    const companies = await dbService.runSQL(queries.select_companies())

    return companies


  
  } catch (err) {
    throw err;
  }
}

async function getProducts(name) {
  try {

    var [companyId] = await dbService.runSQL(queries.get_company_id(name))
    companyId = companyId.id

    
    var products = await dbService.runSQL(queries.get_products_uuid_and_name(companyId))

    

    return products
    


  
  } catch (err) {
    throw err;
  }
}

async function getDialcodes() {
  try {

    const codes = await dbService.runSQL(queries.select_codes())

    return codes


  
  } catch (err) {
    throw err;
  }
}

async function getTableNames(table,id) {
  try {

    const names = await dbService.runSQL(queries.get_table_names(table,id))

    return names


  
  } catch (err) {
    throw err;
  }
}





module.exports = {
  getCountries,
  getStates,
  getPositions,
  getRegulators,
  getCompanies,
  getProducts,
  getDialcodes,
  getTableNames
};
