const insert_onboarding = (name,companyId) => {
    return `
    INSERT INTO compliance.onboarding (legal_entity_name,company_entity_id) VALUES('${name}',${companyId});`
}
const update_to_null = (uuid, field) => {
    return `
    ;`
}

const update_onboarding = (uuid,field,value,type) => {


   switch(type){

       case 'number':

       return `UPDATE onboarding set ${field}=${value} WHERE uuid='${uuid}'`

       case 'string':

        return `UPDATE onboarding set ${field}='${value}' WHERE uuid='${uuid}'`


       case 'object':


        return `UPDATE onboarding set ${field}= ${value? `${JSON.stringify(value)}` : null} WHERE uuid='${uuid}'`


   }
}

const insert_has_company_entity_asset = (onboardingId,assetId) => {
    return `
    INSERT INTO onboarding_has_company_entity_asset(onboarding_id,company_entity_asset_id) VALUES(${onboardingId},${assetId});`
}

const remove_has_company_entity_asset = (onboardingId,assetId) => {
    return `
    DELETE FROM onboarding_has_company_entity_asset WHERE onboarding_id = ${onboardingId} and company_entity_asset_id = ${assetId};`
}

const get_uuid_by_id = (id) => {
    return `
    SELECT uuid FROM onboarding WHERE id=${id};`
}

const get_id_by_uuid = (uuid) => {
    return `
    SELECT id FROM onboarding WHERE uuid='${uuid}';`
}

const get_onboarding_progress_columns = (id) => {
    return `
    SELECT uuid FROM onboarding WHERE id=${id};`
}

const get_company_assets = (id) => {
    return `SELECT company_entity_asset_id FROM onboarding_has_company_entity_asset where onboarding_id=${id};`
}
const get_assets_names = (ids) => {
    return `select name from asset where id in (${ids})`
}


const get_monday_id = (uuid) => {
    return `SELECT monday_id FROM onboarding where uuid='${uuid}';`
}

const get_required_fields = (uuid) => {
    return `SELECT company_entity_id,legal_entity_name,country_id FROM onboarding where uuid='${uuid}';`
}

const get_data_to_show = (uuid) => {
    return `SELECT company_entity_id,legal_entity_name,legal_entity_identifier,registration_gapi_location,country_id,us_state_id,regulator,regulation_number,activity_description FROM onboarding where uuid='${uuid}';`
}







module.exports = {
    insert_onboarding,
    update_onboarding,
    update_to_null,
    insert_has_company_entity_asset,
    get_uuid_by_id,
    get_onboarding_progress_columns,
    get_id_by_uuid,
    get_company_assets,
    get_monday_id,
    get_assets_names,
    get_required_fields,
    get_data_to_show,
    remove_has_company_entity_asset
}


