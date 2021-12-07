const onBoardingService = require('./onboarding.service')
const mondayUtils = require('../../services/utils/monday-utils')
async function getOnBoarding(req, res) {
    try {
      const { id } = req.params;

      const [onBoarding] = await onBoardingService.getOnBoardingById(id);
      const progress = await onBoardingService.getOnBoardingProgress(id)
      if(onBoarding) {
        onBoarding.progress = progress.progress
        res.send(onBoarding);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
  
  async function updateOnBoarding(req, res) {
    try {
      const { id } = req.params;
      const { fieldToUpdate } = req.body;
  
      
      const progress = await onBoardingService.updateOnBoarding(id, fieldToUpdate);

      await mondayUtils.updateMondayOnBoarding(id, fieldToUpdate)
  
      res.send(progress)
  
    } catch (err) {
      res.status(400).send(err);
    }
  }

  module.exports = {
    getOnBoarding,
    updateOnBoarding
  }