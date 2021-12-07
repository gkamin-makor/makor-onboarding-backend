const insert_contact = (contact) => {
    return `
    INSERT INTO contact (client_name, client_email, client_phone, client_company) VALUES('${contact.client_name}','${contact.client_email}','${contact.client_phone}','${contact.client_company}');
    `
}

const get_contact_by_uuid = (uuid) => {
    return `
        SELECT * FROM contact WHERE id = '${uuid}';
    `
}

const get_contact_by_id = (id) => {
    return `
        SELECT * FROM contact WHERE id = ${id};
    `
}


module.exports = {
    get_contact_by_id,
    get_contact_by_uuid,
    insert_contact
}