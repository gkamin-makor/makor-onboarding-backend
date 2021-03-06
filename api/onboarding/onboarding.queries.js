const insert_onboarding = (name,companyId) => {
    return `
    INSERT INTO onboarding (legal_entity_name,company_id) VALUES('${name}',${companyId});`
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


        return `UPDATE onboarding set ${field}= ${value? `'${JSON.stringify(value)}'` : null} WHERE uuid='${uuid}'`


   }
}

const insert_has_company_asset = (onboardingId,assetId) => {
    return `
    INSERT INTO onboarding_has_company_asset(onboarding_id,company_asset_id) VALUES(${onboardingId},${assetId}) ON DUPLICATE KEY UPDATE onboarding_id=${onboardingId},company_asset_id=${assetId};`
}

const remove_has_company_asset = (onboardingId,assetId) => {
    return `
    DELETE FROM onboarding_has_company_asset WHERE onboarding_id = ${onboardingId} and company_asset_id = ${assetId};`
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
    return `SELECT company_asset_id FROM onboarding_has_company_asset where onboarding_id=${id};`
}
const get_assets_names = (ids) => {
    return `select name from asset where id in (${ids})`
}

const get_assets_uuids = (ids) => {
    return `select uuid from company_asset where id in (${ids})`
}


const get_monday_id = (uuid) => {
    return `SELECT monday_id FROM onboarding where uuid='${uuid}';`
}

const get_required_fields = (uuid) => {
    return `SELECT company_id,legal_entity_name,country_id FROM onboarding where uuid='${uuid}';`
}

const get_data_to_show = (uuid) => {
    return `SELECT company_id,legal_entity_name,legal_entity_identifier,registration_gapi_location,country_id,us_state_id,regulator_id,regulation_number,activity_description FROM onboarding where uuid='${uuid}';`
}


const get_company_uuid = (id) => {
    return `select distinct company.uuid 
    from company join onboarding
    on company.id =onboarding.company_id
    where onboarding.company_id =${id};`
}

const update_agreed = (uuid,timestamp,ip) => {
    return `UPDATE onboarding SET agreed_at=${ timestamp? `'${timestamp}'` : null    }, agreed_ip=${ ip? `'${ip}'` : null    } WHERE uuid='${uuid}'`
}







module.exports = {
    insert_onboarding,
    update_onboarding,
    update_to_null,
    insert_has_company_asset,
    get_uuid_by_id,
    get_onboarding_progress_columns,
    get_id_by_uuid,
    get_company_assets,
    get_monday_id,
    get_assets_names,
    get_required_fields,
    get_data_to_show,
    remove_has_company_asset,
    get_assets_uuids,
    get_company_uuid,
    update_agreed
}


