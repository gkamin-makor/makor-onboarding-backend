const fileService = require('../file/file.service')
const mondayUtils = require('../../services/utils/monday-utils')

async function updateFileUpload(req, res) {
    try {
  
      const {id,field} = req.params
      const filename = req.filename
  
  
      const progress = await fileService.updateFileUpload(id,field,filename)
      const {filesCount} = progress

      const fieldToUpdate = {
        field: 'status',
        value: `${filesCount}/9`
      }

      await mondayUtils.updateMondayOnBoarding(id,fieldToUpdate)
  
      res.send(progress)
  
  
  
  
    } catch (err) {
      res.status(400).send(err);
    }
  }
  
  async function getFiles(req, res) {
    try {
  
      const {id} = req.params
  
      const filesNames = await fileService.getFilesNames(id)
  
      res.send(filesNames)
  
  
  
  
    } catch (err) {
      res.status(400).send(err);
    }
  }

  module.exports = {
    updateFileUpload,getFiles
  }
  