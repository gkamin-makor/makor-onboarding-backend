const mondayUtils = require('../../services/utils/monday-utils')
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
  
  async function getOnBoardingById(id) {
    try {
      
  
      const onBoarding = await dbService.runSQL(query.get_onboarding_by_id(id));
  
      return onBoarding;
  
    } catch (err) {
      
      throw new Error('Get on boarding by id error has been thrown.')
    }
  }
  
  async function updateOnBoardingByUuid(uuid, fieldToUpdate) {
    try {
  
      await dbService.runSQL(query.update_onboarding(id, fieldToUpdate));
  
      const progress = await getOnBoardingProgress(id);
  
      return progress;
      
    } catch (err) {
      throw err;
    }
  }

  async function updateOnBoarding(id, fieldToUpdate) {
    try {
  
      await dbService.runSQL(query.update_onboarding(id, fieldToUpdate));
  
      const progress = await getOnBoardingProgress(id);
  
      return progress;
      
    } catch (err) {
      throw err;
    }
  }
  
  async function getOnBoardingProgress(id) {
     try {
       const requiredCount = 18;
   
  
      const [onboarding] = await dbService.runSQL(query.get_onboarding_by_id(id));
  
      //these two lines removes id, uuid and monday column
   
       const boarding_fields = Object.values(onboarding).slice(2)
  
       boarding_fields.splice(boarding_fields.length -1 ,1)
  
   
       const fieldsCount = boarding_fields.reduce((count, field) => {
         if (field) count++;
         return count;
       }, 0);
   

       const files = await dbService.runSQL(query.get_file_names_by_id(id))

  
  
       const filesNames = files.map(file => file.field_name)
  
  
       
       const filesCount = [...new Set(filesNames)].length
  
  
       
       const progress = Math.round((filesCount+fieldsCount) / requiredCount * 100)
       
   
       return {progress,filesCount}
   
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