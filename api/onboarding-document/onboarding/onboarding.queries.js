const insert_onboarding = (id) => {
    return `
    INSERT INTO on_boarding (on_boarding_id,cname,oaddress,paddress,url,description,directors,regnumber,country,holders,monday_item_id) VALUES('${id}','','','','','','','','','','');`
}

const get_onboarding_by_id = (id) => {
    return `
    SELECT * FROM makor.on_boarding WHERE on_boarding_id = '${id}';`
}

const update_onboarding_by_uuid = (id,fieldToUpdate) => {
    return `
    update on_boarding set ${fieldToUpdate.field}='${fieldToUpdate.value}' where on_boarding_id='${id}';`
}

const get_file_names_by_id = (id) => {
    return `
    SELECT field_name FROM makor.on_boarding_file where boarding_id='${id}' and (field_name='CERTIFICATE' or field_name='ARTICLES' or field_name='PROOF' or field_name='DIRECTORS' or field_name='SHAREHOLDERS' or field_name='FUNDS' or field_name='OWNERSHIP' or field_name='COMPLIANCE' or field_name='STATEMENT');`
}

module.exports = {
    insert_onboarding,
    get_onboarding_by_id,
    update_onboarding,
    get_file_names_by_id
}

