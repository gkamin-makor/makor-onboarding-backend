const contactService = require('./contact.service')
const onBordingService = require('../onboarding/onboarding.service')
const mondayUtils = require('../../services/utils/monday-utils')
const emailUtils = require('../../services/utils/email-utils')

async function createNewContact(req, res) {
    try {
  
      const contact = req.body
      // create contact
      const contactId = await contactService.createContact(contact)
      
      
      const {id,client_name,client_email} = await contactService.getContactById(contactId)

      
      //create monday onboarding
      const itemId = await mondayUtils.createMondayOnBoarding(client_name)

  
     const fieldToupdate = {
        field:'monday_item_id',
        value:itemId
     }

  
     await onBordingService.updateOnBoarding(uuid,fieldToupdate)
     
      
      // send mail 
      await emailUtils.sendEmail(client_email,uuid)
      
      res.status(200).send('success!')
  
  
    } catch (err) {
      res.status(400).send(err);
    }
  }

  module.exports = {
    createNewContact
  };
  
  