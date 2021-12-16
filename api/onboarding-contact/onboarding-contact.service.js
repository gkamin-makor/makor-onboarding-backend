const dbService = require('../../services/db.service')
const queries = require('./onboarding-contact.queries')

async function createOnboardingContact(onboardingId,position,name,email,phone) {
    try {
  

      await dbService.runSQL(queries.insert_contact(onboardingId,position,name,email,phone))
    
     
    
    } catch (err) {
      throw err;
    }
  }

async function updateOnboardingContact(onboardingId,field,value,type) {
    try {
      

      await dbService.runSQL(queries.update_onboarding_contact(onboardingId,field,value,type))
    
     
    
    } catch (err) {
      throw err;
    }
  }

  async function getRequiredFieldsCount(id) {
    try {



  
     const [requiredFields] = await dbService.runSQL(queries.get_required_fields(id))

  
     
     return requiredFields? 1 : 0
     
  
  
    } catch (err) {
      throw err;
    }
  }

  async function getonboardingContactData(id) {
    try {



      const [data] = await dbService.runSQL(queries.get_data_to_show(id))
     
      return data
  
    } catch (err) {
      throw err;
    }
  }
  

   module.exports = {
    createOnboardingContact,
    updateOnboardingContact,
    getRequiredFieldsCount,
    getonboardingContactData
   }