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
  

   module.exports = {
    createOnboardingContact,
    updateOnboardingContact
   }