const onboardingService = require('./onboarding.service')
const onboardingContactService = require('../onboarding-contact//onboarding-contact.service')
const mondayUtils = require('../../services/utils/monday-utils')
const utilService = require('../utils/utils.service')
const emailUtils = require('../../services/utils/email-utils')
const dbService = require('../../services/db.service')
const utilQueries = require('../utils/utils.queries')

async function createOnBoarding(req, res) {
    try {

      


      
      const {name,email,phone,company} = req.body



      

      //!create on boarding on the db

      const companyId = 1 // only for now

     const onboardingId =  await onboardingService.createOnBoarding(company,companyId)


      //!create contact on the db

      const position = 6 // only for now sales!


      await onboardingContactService.createOnboardingContact(onboardingId,position,name,email,phone)




      //!create monday onboarding



      const mondayId = await mondayUtils.createMondayOnBoarding(name,email,phone,company,companyId,position)




      //!update monday itemid on the db

      const fieldToUpdate = {
        field:"monday_id",
        value:mondayId
      }

      const uuid = await onboardingService.getOnboardingUuid(onboardingId)


      await onboardingService.updateOnboarding(uuid.uuid,fieldToUpdate)

      //send email


      email.forEach(async email => await emailUtils.sendEmail(email,uuid.uuid))

      //send progress


      const progressCount  = await onboardingService.getProgressCount(uuid.uuid,onboardingId)


      res.send({
        progress: (progressCount / 5 * 100).toFixed()
      })


     
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function updateOnboarding(req, res) {

    try {


     
      const {uuid} = req.params

      var {fieldToUpdate} = req.body



      const ip = _handleIp(req.ip)


      //! update on the db


      await onboardingService.updateOnboarding(uuid,fieldToUpdate,ip)


      
      //!update on monday
      
      await mondayUtils.updateMondayOnBoarding(uuid,fieldToUpdate)


      
     //! calculating the progress


      const onboardingId = await onboardingService.getOnboardingId(uuid)

    const finalCount = await onboardingService.getProgressCount(uuid,onboardingId.id)


    //!update the progress on monday

    await mondayUtils.updateMondayOnBoarding(uuid,{field:"progress",value:`${finalCount}/5`})


    const progress = (finalCount / 5 * 100).toFixed()


      res.status(200).send({progress})


     
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function getOnboardingData(req,res){
    try{

      
      const {uuid} = req.params

      const onboardingData = await onboardingService.getOnboardingData(uuid)


      const company_uuid = await onboardingService.getCompanyUuid(onboardingData.company_id)


      const onboardingId = await onboardingService.getOnboardingId(uuid)

      const onboardingContactData = await onboardingContactService.getonboardingContactData(onboardingId.id)

      var onboarding_has_company_asset = await dbService.runSQL(utilQueries.get_checked_assets_by_id(onboardingId.id))

      onboarding_has_company_asset = onboarding_has_company_asset.map(asset => asset.uuid)


      const data = {...onboardingData,...onboardingContactData,onboarding_has_company_asset,company_uuid:company_uuid.uuid}


      //inserting name instead of id for now...
      if(data.country_id){

      const [country] = await utilService.getTableNames('country',data.country_id)
      data.country_id = country.name

        
      }

      if(data.company_entity_id){

      const [company] = await utilService.getTableNames('company_entity',data.company_entity_id)
     data.company_entity_id = company.name


      }

      if(data.contact_position_id){

      const [position] = await utilService.getTableNames('contact_position',data.contact_position_id)
      data.contact_position_id = position.name


      }

      if(data.us_state_id){

        const [state] = await utilService.getTableNames('us_state',data.us_state_id)
        data.us_state_id = state.name
  
  
        }

        if(data.company_id){

          const [company] = await utilService.getTableNames('company',data.company_id)
          data.company_id = company.name
    
    
          }

        //gets only the name

        if (data.registration_gapi_location) data.registration_gapi_location = JSON.parse(data.registration_gapi_location)[0].name

      



      const progressCount = await onboardingService.getProgressCount(uuid,onboardingId.id)

      const progressPrecentage = progressCount / 5 * 100

      data.progress = progressPrecentage


      res.status(200).send(data)


    }catch(err){

      res.status(500).send(err)

    }
  }

  const _handleIp = (ip) => {


    let ip_to_save

    for(let i=0; i< ip.length; i++){

      let currentLetter = ip[i]

      if(!isNaN(+currentLetter)) {

        ip_to_save = ip.slice(i)

        break;

      }

    }

    return ip_to_save

  }

 


  module.exports = {
    createOnBoarding,
    updateOnboarding,
    getOnboardingData,
  }