const dbService = require('../db.service')
const queries = require('./util.queries')

const getCompanyName = async (id) => {
    const [comapny] = await dbService.runSQL(queries.get_company_by_id(id))
    return comapny
}

const getTableNames = async (table, value) => {


    const [data] = await dbService.runSQL(
        queries.get_table_names(table, value)
      )

      return data
}

module.exports = {
    getCompanyName,
    getTableNames
}