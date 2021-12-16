const dbService = require("../../services/db.service");
const queries = require("./onboarding.queries");
const utilQueries = require("../utils/utils.queries");
const onboardingContactService = require('../onboarding-contact/onboarding-contact.service');
const e = require("cors");

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

async function updateOnboarding(uuid, {field,value,isAdd = null}) {
  try {



    var [onboarding_id] = await dbService.runSQL(queries.get_id_by_uuid(uuid))

    onboarding_id = onboarding_id.id



    const onboardingFields = [
      "company_entity_id",
      "legal_entity_name",
      "legal_entity_identifier",
      "registration_gapi_location",
      "country_id",
      "us_state_id",
      "regulator",
      "regulation_number",
      "activity_description",
      "monday_id"
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

      else if (field === 'company_entity_id' && value){

          var [id] = await dbService.runSQL(utilQueries.get_company_id(value))
          value = id.id
      }
        await dbService.runSQL(queries.update_onboarding(uuid,field,value,typeof value))
      return
      
    }
      //! onboarding_has_company_entity_asset table
     
      else if (field === 'onboarding_has_company_entity_asset'){

      //getting the product id

      var [id] = await dbService.runSQL(utilQueries.get_product_id(value))
      id = id.id

      //add company asset


      if (isAdd) await dbService.runSQL(queries.insert_has_company_entity_asset(onboarding_id,id))

      //remove company asset

      else dbService.runSQL(queries.remove_has_company_entity_asset(onboarding_id,id))
      
        
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

   assets = assets.map(asset => asset.company_entity_asset_id)

   var assetsNames = assets.length? await dbService.runSQL(queries.get_assets_names(assets)) : []

   
   return assetsNames


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



module.exports = {
  createOnBoarding,
  updateOnboarding,
  getOnboardingUuid,
  getRequiredFieldsCount,
  getOnboardingId,
  getAssetsCount,
  getProgressCount,
  getOnboardingData,
  getAssets
};


