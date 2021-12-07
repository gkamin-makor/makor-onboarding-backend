const dbService = require('../../services/db.service')
const query = require('./onboarding.queries')

async function createOnBoarding(id,name) {
    try {
  
  
     await dbService.runSQL(query.insert_onboarding(id));
  
    
     return
    
    } catch (err) {
      throw err;
    }
  }
  

   module.exports = {
     createOnBoarding,
     getOnBoardingById,
     updateOnBoarding,
     getOnBoardingProgress
   }