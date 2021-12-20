const axios = require("axios");
const dbService = require("../db.service");
const queries = require("../../api/onboarding/onboarding.queries");
const utilQueries = require("../../api/utils/utils.queries");

async function updateMondayOnBoarding(uuid, fieldToUpdate) {
  try {


    var updatedValue;

    const fieldsMap = {
      company_id: "text",
      legal_entity_name: "text_12",
      legal_entity_identifier: "text_2",
      registration_gapi_location: "text_3",
      country_id: "text_4",
      us_state_id: "text_5",
      regulator_id: "text_6",
      regulation_number: "text_7",
      activity_description: "text_8",
      position_id: "text83",
      name: "text1",
      email: "text5",
      phone: "text11",
      progress: "status",
      onboarding_has_company_asset: "text_9",
      is_agreed: "status0"
    };




    //handle company asset and agreed

    if (fieldToUpdate.field === "onboarding_has_company_asset") {
      const [onboardingId] = await dbService.runSQL(
        queries.get_id_by_uuid(uuid)
        );
        const data = await dbService.runSQL(
          queries.get_company_assets(onboardingId.id)
          );
          

      const assetsIds = data.map((asset) => asset.company_asset_id);


      const assetsNames = assetsIds.length? await dbService.runSQL(
        queries.get_assets_names(`${assetsIds}`)
        ) : []

        
      fieldToUpdate.value = assetsNames? `${assetsNames.map((asset) => asset.name)}` : []

    } else if(fieldToUpdate.field === "is_agreed"){
      fieldToUpdate.value = fieldToUpdate.value? "✔" : "✖"
    }

    // handle diffrent jsons

    switch (fieldToUpdate.field) {
      case "registration_gapi_location":
        //later on
        break;

      case "email":
        fieldToUpdate.value = `${fieldToUpdate.value}`;
        break;

      case "phone":
        fieldToUpdate.value = `${fieldToUpdate.value}`;
        break;
    }

    //string
    if (typeof fieldToUpdate.value === "string")
      updatedValue = fieldToUpdate.value;
    //object
    else if (typeof fieldToUpdate.value === "object")
      updatedValue = JSON.stringify(fieldToUpdate.value);
    //int
    else updatedValue = `${fieldToUpdate.value}`;




    const [itemId] = await dbService.runSQL(queries.get_monday_id(uuid));

        
    const headers = {
      "Content-Type": "application/json",
      Authorization: process.env.TOKEN,
    };

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
        boardId: +process.env.BOARD_ID,
        itemId: +itemId.monday_id,
        columnId: fieldsMap[fieldToUpdate.field],
        columnValue: updatedValue === 'null'? '' : updatedValue,
      },
    };

     axios.post("https://api.monday.com/v2", body, { headers }).catch(err => console.log(err))
  } catch (err) {
    throw err;
  }
}

async function createMondayOnBoarding(name,email,phone,legalName,companyId,positionId) {
  try {



    var [company] = await dbService.runSQL(utilQueries.get_company_name(companyId))
    company = company.name

    var [position] = await dbService.runSQL(utilQueries.get_position_name(positionId))
    position = position.name


    const headers = {
      "Content-Type": "application/json",
      Authorization: process.env.TOKEN,
    };

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
        boardId: +process.env.BOARD_ID,
        itemName: `Makor - ${legalName}`,
        columnValues: JSON.stringify({text_12:legalName,text83:position,text1:name,text5:`${email}`,text11:`${phone}`,text:company})
      },
    };

     const res = await axios.post("https://api.monday.com/v2", body, {
      headers,
    })

    const itemId = res.data.data.create_item.id;

    return itemId;
  } catch (err) {
    throw err;
  }
}







module.exports = {
  updateMondayOnBoarding,
  createMondayOnBoarding,
};
