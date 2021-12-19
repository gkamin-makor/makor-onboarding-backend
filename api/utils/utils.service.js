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

async function getProducts(id) {
  try {


    const [company_id_response] = await dbService.runSQL(queries.get_company_id_by_uuid(id))



   
    const assets_and_modes = await dbService.runSQL(queries.get_assets_by_company_id(company_id_response.id)) 



    
    let filtered_assets = []

    assets_and_modes.forEach((asset) => {

      let existing = filtered_assets.filter((v, i) => {

        return v.asset_name == asset.asset_name

      })

      if (existing.length) {

        let existing_index = filtered_assets.indexOf(existing[0])

        let modes = [filtered_assets[existing_index].mode_name]

        filtered_assets[existing_index].modes = [...modes, asset.mode_name]

        delete filtered_assets[existing_index].mode_name

      } else {

        asset.modes = [asset.mode_name]

        filtered_assets.push(asset)

      }

    })

    filtered_assets.forEach(asset => delete asset.mode_name)



    return filtered_assets
    


  
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
