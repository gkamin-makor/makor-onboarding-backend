const dbService = require("../../services/db.service");

async function createContact(contact) {
  try {
    const sqlCmd = `INSERT INTO contact (client_name, client_email, client_phone, client_company) VALUES('${contact.client_name}','${contact.client_email}','${contact.client_phone}','${contact.client_company}');`;

    const { insertId } = await dbService.runSQL(sqlCmd);

    return insertId;
  } catch (err) {
    throw err;
  }
}

async function getContactById(id) {
  try {
    const sqlCmd = `SELECT * FROM contact WHERE id = '${id}';`;

    const [contact] = await dbService.runSQL(sqlCmd);

    return contact;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createContact,
  getContactById,
};
