const insert_contact = (onboardingId,contactPosition,name,email,phone) => {
    return `
    insert into onboarding_contact(onboarding_id,contact_position_id,name,email,phone) values(${onboardingId},${contactPosition},'${name}','${JSON.stringify(email)}','${JSON.stringify(phone)}');`
}

const update_onboarding_contact = (onboardingid,field,value,type) => {
    switch(type){
 
        case 'number':
 
        return `UPDATE onboarding_contact set ${field}=${value} WHERE onboarding_id=${onboardingid}`
 
        case 'string':
 
         return `UPDATE onboarding_contact set ${field}='${value}' WHERE onboarding_id=${onboardingid}`
 
 
        case 'object':
 
         return `UPDATE onboarding_contact set ${field}='${JSON.stringify(value)}' WHERE onboarding_id=${onboardingid}`
 
 
    }
 }


module.exports = {
    insert_contact,
    update_onboarding_contact
}

