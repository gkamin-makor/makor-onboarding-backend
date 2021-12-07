const dbService = require("../../services/db.service");
const queries = require("./onboarding.queries");
const onboardingContactService = require('../onboarding-contact/onboarding-contact.service')

async function createOnBoarding(name, companyId) {
  try {
    const { insertId } = await dbService.runSQL(
      queries.insert_onboarding(name, companyId)
    );

    return insertId;
  } catch (err) {
    throw err;
  }
}

async function updateOnboarding(uuid, { field, value }) {
  try {
    const [onboardingId] = await dbService.runSQL(
      `SELECT id FROM onboarding WHERE uuid='${uuid}';`
    );


    const onboardingFields = [
      "company_entity_id",
      "legal_entity_name",
      "legal_entity_identifier",
      "registration_gapi_location",
      "country_id",
      "us_state_id",
      "regulator",
      "regulation_number",
      "activity_description"
    ]

  
    //checks with which table to work with

    if (onboardingFields.includes(field))

    //onboarding table

      await dbService.runSQL(queries.update_onboarding(uuid,field,value,typeof value))

      // onboarding_has_company_entity_asset table

    else if (field === 'company_entity_asset') await dbService.runSQL(queries.insert_has_company_entity_asset(onboardingId.id,value))

    //onboarding_contact table

          else await onboardingContactService.updateOnboardingContact(onboardingId.id,field,value,typeof value)

  } catch (err) {
    throw err;
  }
}

module.exports = {
  createOnBoarding,
  updateOnboarding,
};
