const dbService = require('../../services/db.service')
const {getOnBoardingProgress} = require('../onboarding/onboarding.service')
const query = require('./file.queries')

async function updateFileUpload(id, field, filename) {
    try {

  
      await dbService.runSQL(query.insert_file_upload(id, field, filename));
  
      const progress = await getOnBoardingProgress(id);

  
      return progress;
  
    } catch (err) {
      throw err;
    }
  }
  
  async function getFilesNames(id) {
     try {
   
       const filesNames = await dbService.runSQL(query.get_files_by_id(id));
        
       const fieldNames = filesNames.map((file)=>{
          return {
             field_name : file.field_name,
             file_name : file.file_name
          }
       })
   
       return fieldNames;
   
     } catch (err) {
       throw err;
     }
   }

   module.exports = {
     updateFileUpload,
     getFilesNames
   }