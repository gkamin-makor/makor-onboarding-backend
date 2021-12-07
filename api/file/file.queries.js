const insert_file_upload = (id,field,filename) => {
    return `
    INSERT INTO on_boarding_file (boarding_id,file_name,field_name) VALUES('${id}','${filename}','${field}');
    `
}

const get_files_by_id = (id) => {
    return `
    SELECT * FROM makor.on_boarding_file WHERE boarding_id = '${id}';
    `
}



module.exports = {
    insert_file_upload,
    get_files_by_id
}