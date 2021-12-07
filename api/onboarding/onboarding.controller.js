const onboardingService = require('./onboarding.service')
const onboardingContactService = require('../onboarding-contact//onboarding-contact.service')
const mondayUtils = require('../../services/utils/monday-utils')

async function createOnBoarding(req, res) {
    try {

      
      const {name,email,phone,company} = req.body

      //create on boarding

      const companyId = 1 // only for now

     const onboardingId =  await onboardingService.createOnBoarding(company,companyId)
     
      //create contact

      const position = 8 // only for now sales!

      await onboardingContactService.createOnboardingContact(onboardingId,position,name,email,phone)


      //create monday onboarding(waiting for arzu)

      await mondayUtils.createMondayOnBoarding(company)









      res.status(200).send()


     
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async function updateOnboarding(req, res) {

    try {

      const {uuid} = req.params

      const {fieldToUpdate} = req.body

      await onboardingService.updateOnboarding(uuid,fieldToUpdate)
     

      






      res.status(200).send()


     
    } catch (err) {
      res.status(400).send(err);
    }
  }
  


  module.exports = {
    createOnBoarding,
    updateOnboarding
  }