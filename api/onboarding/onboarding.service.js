const dbService = require("../../services/db.service");
const queries = require("./onboarding.queries");
const utilQueries = require("../utils/utils.queries");
const onboardingContactService = require('../onboarding-contact/onboarding-contact.service');
const moment = require('moment')

async function createOnBoarding(name, companyId) {
  try {
    const { insertId } = await dbService.runSQL(
      queries.insert_onboarding(name, companyId)
    );

    return insertId;
  } catch (err) {
    throw err;
  }
}

async function updateOnboarding(uuid, {field,value,is_add = null},ip) {
  try {



    var [onboarding_id] = await dbService.runSQL(queries.get_id_by_uuid(uuid))

    onboarding_id = onboarding_id.id



    const onboardingFields = [
      "company_id",
      "legal_entity_name",
      "legal_entity_identifier",
      "registration_gapi_location",
      "country_id",
      "us_state_id",
      "regulator_id",
      "regulation_number",
      "activity_description",
      "monday_id",
    ]



    //!checks with which table to work with

    if (onboardingFields.includes(field)){


      //!onboarding table


      //if the payload is id go get me the name

      if (field === 'country_id' && value){

        var [id] = await dbService.runSQL(utilQueries.get_country_id_by_name(value))
        value = id.id
      }
      else if (field === 'us_state_id' && value){

        var [id] = await dbService.runSQL(utilQueries.get_state_id_by_name(value))
        value = id.id
      }

      else if (field === 'company_id' && value){

          var [id] = await dbService.runSQL(utilQueries.get_company_id(value))
          value = id.id
      }

      else if (field === 'regulator_id' && value){


        var [id] = await dbService.runSQL(utilQueries.get_regulator_id(value))
        value = id.id
    }

        await dbService.runSQL(queries.update_onboarding(uuid,field,value,typeof value))

        //handle clear assets in case of switching company


        if (field === 'company_id') await dbService.runSQL(utilQueries.clear_all_assets())

      return
      
    }
      //! onboarding_has_company_entity_asset table
     
      else if (field === 'onboarding_has_company_asset'){

        //getting the assets ids

        //!proceed from here!

        const test = value.map(test => `"${test}"`)

        var assets_ids = await dbService.runSQL(utilQueries.get_assets_ids(test))
        assets_ids = assets_ids.map(asset => asset.asset_id)


      //add company asset


      if (is_add) assets_ids.forEach(async id => await dbService.runSQL(queries.insert_has_company_asset(onboarding_id,id))) 

      //remove company asset

      else assets_ids.forEach(async id => await dbService.runSQL(queries.remove_has_company_asset(onboarding_id,id))) 
      
        
      return
      
    } else if (field === "is_agreed"){

      const formated_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

     value? await dbService.runSQL(queries.update_agreed(uuid,formated_timestamp,ip)) : await dbService.runSQL(queries.update_agreed(uuid,null,null))


      return
     
      
    }

    //!onboarding_contact table

          else {

            if (field === 'position_id'){
              field = "contact_position_id"
              var [id] = await dbService.runSQL(utilQueries.get_position_id(value))
              value  = id.id
            }
            
        
            await onboardingContactService.updateOnboardingContact(onboarding_id,field,value,typeof value)
          }


  } catch (err) {
    throw err;
  }
}

async function getOnboardingUuid(id) {
  try {
    const [uuid] = await dbService.runSQL(
      queries.get_uuid_by_id(id)
    );

    return uuid;
  } catch (err) {
    throw err;
  }
}

async function getOnboardingId(uuid) {
  try {

    const [id] = await dbService.runSQL(
      queries.get_id_by_uuid(uuid)
    );

    return id;

  } catch (err) {
    throw err;
  }
}

async function getRequiredFieldsCount(uuid) {
  try {

   const [requiredFields] = await dbService.runSQL(queries.get_required_fields(uuid))


   const fieldsCount = Object.values(requiredFields).reduce((count,value) => {
    if (value) count++
    return count
   },0)

   
   return fieldsCount
   


  } catch (err) {
    throw err;
  }
}

async function getAssetsCount(id) {
  try {

    
   const [requiredFields] = await dbService.runSQL(queries.get_company_assets(id))

   
   return requiredFields? 1 : 0
   


  } catch (err) {
    throw err;
  }
}

async function getAssets(id) {
  try {

    
   var assets = await dbService.runSQL(queries.get_company_assets(id))
   

   assets = assets.map(asset => asset.company_asset_id)

   var assets_uuids = assets.length? await dbService.runSQL(queries.get_assets_uuids(assets)) : []

   return assets_uuids


  } catch (err) {
    throw err;
  }
}

async function getProgressCount(uuid,id) {
  try {

    
    const onboardingFieldsCount =  await getRequiredFieldsCount(uuid)


    const onboardingContactFieldsCount = await onboardingContactService.getRequiredFieldsCount(id)

    
    const assetsCount = await getAssetsCount(id)

    
    
   const finalCount = onboardingFieldsCount+onboardingContactFieldsCount+assetsCount

   return finalCount
   
  
  } catch (err) {
    throw err;
  }
}

async function getOnboardingData(uuid) {
  try {


    const [data] = await dbService.runSQL(queries.get_data_to_show(uuid))

    return data
    
  } catch (err) {
    throw err;
  }
}

async function getCompanyUuid(id) {
  try {

    console.log(id);

    
  const [company_uuid] = await dbService.runSQL(queries.get_company_uuid(id))


  return company_uuid


  } catch (err) {
    throw err;
  }
}




module.exports = {
  createOnBoarding,
  updateOnboarding,
  getOnboardingUuid,
  getRequiredFieldsCount,
  getOnboardingId,
  getAssetsCount,
  getProgressCount,
  getOnboardingData,
  getAssets,
  getCompanyUuid
};


