const dbService = require('../../services/db.service')
const query = require('./contact.queries')


async function createContact(contact) {
    try {

    const {insertId} =  await dbService.runSQL(query.insert_contact(contact));

   
     return insertId
 
    } catch (err) {
      throw err;
    }
  }
 
 
 
 async function getContactById(id) {
    try {
       
 
       const [contact] = await dbService.runSQL(query.get_contact_by_id(id));

 
       return contact;
 
      
  
    } catch (err) {
      throw err;
    }
  }

  module.exports = {
    createContact,
    getContactById
  };