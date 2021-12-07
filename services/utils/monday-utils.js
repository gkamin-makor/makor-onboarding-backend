const axios = require('axios')
const dbService = require('../db.service')

async function updateMondayOnBoarding(id,fieldToUpdate) {
    try {

 
       const fieldsMap = {
          cname:'text44',
          regnumber:'text8',
          oaddress:'text_1',
          country:'text3',
          paddress:'text38',
          url:'text77',
          description:'text4',
          directors:'text9',
          holders:'text7',
          status:'status2'

       }
 
       const sqlCmd = `SELECT monday_item_id FROM on_boarding where on_boarding_id='${id}';`

 
       const [itemId] = await dbService.runSQL(sqlCmd)
 
 
       const headers= {
          'Content-Type': 'application/json',
          'Authorization' : process.env.ACCESS_TOKEN_MONDAY
         }
      
    
      
        const body = {
          query: `
          mutation ($boardId: Int!, $itemId: Int!, $columnId:String! $columnValue: String!) {
            change_simple_column_value (
              board_id: $boardId,
              item_id: $itemId,
              column_id: $columnId,
              value: $columnValue
            ) {
              id
            }
          }
          `,
          variables: {
            boardId: +process.env.BOARD_ID_MONDAY,
            itemId: +itemId.monday_item_id,
            columnId: fieldsMap[fieldToUpdate.field],
            columnValue: fieldToUpdate.value,
          
        }
      }
      
          await axios.post('https://api.monday.com/v2',body,{headers})
         
   
  
    } catch (err) {
      throw err;
    }
  }
 
  
 
  async function createMondayOnBoarding(name) {
    try {
 
 
       const headers= {
          'Content-Type': 'application/json',
          'Authorization' : process.env.ACCESS_TOKEN_MONDAY
         }
      
       
      
        const body = {
          query: `
          mutation ($boardId: Int!, $itemName: String!, $columnValues: JSON!) {
            create_item (
              board_id: $boardId,
              item_name: $itemName,
              column_values: $columnValues
            ) {
              id
            }
          }
          `,
          variables: {
            boardId: +process.env.BOARD_ID_MONDAY,
          itemName: `${name}`,
          columnValues: JSON.stringify({  })
          }
        }
      
      
      
         const res = await axios.post('https://api.monday.com/v2',body,{headers})
 
         const itemId =  res.data.data.create_item.id

 
 return itemId
 
 
 } catch (err) {
      throw err;
    }
 
 }

 module.exports = {
   updateMondayOnBoarding,
   createMondayOnBoarding,
 }



      