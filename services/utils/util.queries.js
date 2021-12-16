
const get_country = () => {
    return `SELECT * FROM country;`
}

const get_table_names = (table,id) => {
    return `SELECT name FROM ${table} where id=${id};`
}

const get_company_by_id = (id) => {
    return `SELECT name FROM company_entity where id=${id};`
}

const get_co_by_id = (id) => {
    return `SELECT name FROM company_entity where id=${id};`
}




module.exports = {
    get_table_names,
    get_company_by_id
}

