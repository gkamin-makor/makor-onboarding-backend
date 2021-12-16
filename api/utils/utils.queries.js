

const select_countries = () => {
    return `SELECT name FROM country;`
}


const select_states = () => {
    return `SELECT name FROM us_state;`
}

const select_positions = () => {
    return `SELECT name FROM contact_position;`
}

const select_regulators = () => {
    return `SELECT name FROM regulator;`
}

const select_companies = () => {
    return `SELECT name FROM company_entity;`
}

const get_company_id = (name) => {
    return `SELECT id FROM company_entity WHERE name='${name}';`
}

const get_products_id = (id) => {
    return `SELECT asset_id FROM company_entity_asset WHERE company_entity_id=${id};`
}

const get_country_id_by_name = (name) => {
    return `SELECT id FROM country WHERE name='${name}';`
}

const get_state_id_by_name = (name) => {
    return `SELECT id FROM us_state WHERE name='${name}';`
}

const get_products_names = (ids) => {
    return `SELECT name FROM asset WHERE id in (${ids});`
}

const get_product_id = (name) => {
    return `SELECT id FROM asset WHERE name='${name}';`
}
const select_codes = () => {
    return `SELECT dialing_code FROM country;`
}

const get_position_id = (name) => {
    return `SELECT id FROM contact_position WHERE name='${name}';`
}

const get_table_names = (table,id) => {
    return `SELECT name FROM ${table} where id=${id};`
}
const get_company_name = (id) => {
    return `SELECT name FROM company_entity where id=${id};`
}
const get_position_name = (id) => {
    return `SELECT name FROM contact_position where id=${id};`
}

const get_products_uuid_and_name = (id) => {
    return `SELECT DISTINCT company_entity_asset.uuid, asset.name
    FROM company_entity_asset JOIN asset
    ON company_entity_asset.asset_id = asset.id
    WHERE company_entity_asset.company_entity_id = ${id};`
}







module.exports = {
    select_countries,
    select_states,
    select_positions,
    select_regulators,
    select_companies,
    get_company_id,
    get_products_id,
    get_products_names,
    get_country_id_by_name,
    get_state_id_by_name,
    get_product_id,
    select_codes,
    get_position_id,
    get_table_names,
    get_position_name,
    get_company_name,
    get_products_uuid_and_name
}


