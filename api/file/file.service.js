const dbService = require("../../services/db.service");
const { getOnBoardingProgress } = require("../onboarding/onboarding.service");

async function updateFileUpload(id, field, filename) {
  try {
    const sqlCmd = `INSERT INTO on_boarding_file (boarding_id,file_name,field_name) VALUES('${id}','${filename}','${field}');`;

    await dbService.runSQL(sqlCmd);

    const progress = await getOnBoardingProgress(id);

    return progress;
  } catch (err) {
    throw err;
  }
}

async function getFilesNames(id) {
  try {
    const sqlCmd = `SELECT * FROM makor.on_boarding_file WHERE boarding_id = '${id}';`;

    const filesNames = await dbService.runSQL(sqlCmd);

    const fieldNames = filesNames.map((file) => {
      return {
        field_name: file.field_name,
        file_name: file.file_name,
      };
    });

    return fieldNames;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  updateFileUpload,
  getFilesNames,
};
