const insert_onboarding = (name,companyId) => {
    return `
    INSERT INTO compliance.onboarding (legal_entity_name,company_entity_id) VALUES('${name}',${companyId});`
}

const update_onboarding = (uuid,field,value,type) => {
   switch(type){

       case 'number':

       return `UPDATE onboarding set ${field}=${value} WHERE uuid='${uuid}'`

       case 'string':

        return `UPDATE onboarding set ${field}='${value}' WHERE uuid='${uuid}'`


       case 'object':

        return `UPDATE onboarding set ${field}='${JSON.stringify(value)}' WHERE uuid='${uuid}'`


   }
}

const insert_has_company_entity_asset = (onboardingId,assetId) => {
    return `
    INSERT INTO onboarding_has_company_entity_asset(onboarding_id,company_entity_asset_id) VALUES(${onboardingId},${assetId});`
}







module.exports = {
    insert_onboarding,
    update_onboarding,
    insert_has_company_entity_asset
}


