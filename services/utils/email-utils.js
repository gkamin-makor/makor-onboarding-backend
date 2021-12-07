const nodemailer = require('nodemailer')

async function sendEmail(emailToSend,contactId){
    const transporter = nodemailer.createTransport({
       service: "gmail",
       auth:{
           user:"yanivkdev@gmail.com",
           pass:"y0529531253"
       },
       tls: {
           rejectUnauthorized: false
       }
   })
 
 
   let mailOptions = {
       from : "yanivkdev@gmail.com",
       to: emailToSend,
       subject: "Enigma: Onboarding",
       html:message(contactId)
     }
   
   transporter.sendMail(mailOptions, (err,success)=>{
       if(err){
           throw new Error(err)
       }else{
           console.log("Email Sent Successfully");
       }
   })
 }

 
 const first_letter = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      html,
      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      div,
      span,
      img,
      table,
      thead,
      tbody,
      tr,
      th,
      td,
      ul,
      li {
        margin: 0;
        padding: 0;
      }
      body {
        font-size: 17px;
        color: #333;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: normal;
      }
      ul {
        list-style-type: none;
      }
      .text-center {
        text-align: center;
      }
      .text-uppercase {
        text-transform: uppercase;
      }
      .text-nowrap {
        white-space: nowrap;
      }
      .small {
        font-size: 10px;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
      }
      .table th {
        white-space: nowrap;
      }
      .table th,
      .table td {
        vertical-align: top;
        text-align: center;
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 12px;
        padding-right: 12px;
      }

      #header {
        font-size: 12px;
        margin-bottom: 32px;
        padding-top: 12px;
        padding-bottom: 12px;
      }

      #container {
        max-width: 210mm;
        text-align: left;
        margin: 0 auto;
      }

      #container .title {
        margin-bottom: 8px;
      }

      #trade-execution {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 15px;
      }

      #trade-execution .title {
        margin-top: 32px;
      }

      #disclamer {
        padding-top: 40px;
        font-size: 10px;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <div id="header">
      <table>
        <tbody>
          <tr>
            <td>
              <img src="https://enigma-securities.io/enigma-logo-blue-transparent.png" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center">
      <table id="container">
        <tbody>
`
const end_letter = `
          <tr>
            <td id="info">
            <br />
            <br />
              <p>Sincerely</p>
              <p>Enigma Compliance Team</p>
              <p><b>Enigma Securities London Ltd</b></p>
              <p>6th Floor, 7/8 Savile Row</p>
              <p>London W1S 3PE</p>
              <p>+44 (0) 20 7290 5777</p>
              <p>http://www.enigma-securities.io</p>
            </td>
          </tr>
          <tr>
            <td id="disclamer">
              <p><b>Disclaimer</b></p>
              <br />
              <p>
                Enigma Securities Limited is an Appointed Representative of
                Makor Securities London Ltd which is authorised and regulated by
                the Financial Conduct Authority (625054).
              </p>
              <p>
                The information contained in this note issued by Enigma
                Securities Limited is not intended to be advice nor a
                recommendation concerning cryptocurrency investment nor an offer
                or solicitation to buy or sell any cryptocurrency or related
                financial instrument.
              </p>
              <p>
                While we provide this information in good faith it is not
                intended to be relied upon by you and we accept no liability nor
                assume any responsibility for the consequences of any reliance
                that may be placed upon this note.
              </p>
              <p></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`



const message = (contactId) => {
    return ` 
    ${first_letter}
    <tr>
      <td id="credeantials">
        <p>New massage received from the server:</p>
        <br />
        <p>
        Hello, 
    </p><br />
    <p>
        Thank you for getting in touch with Enigma Securities.
    </p><br />
    <p>
        As part of our commitment to remain a trusted cryptocurrency service, all of our counter-parties must be verified by our compliance department.
    </p><br />
    <p>
        Please find below a link to our onboarding form: 
   </p>
        <a href='http://localhost:3000/${contactId}'>Submit onboarding documentation</a>
   <br />
   <p>
        Enigma is fully committed to protecting client confidentiality. Enigma Securities guarantees that it will ensure that all the information provided will remain strictly confidential. 
   </p>
   <p>
        Kindly let us know if you need further assistance,
   </p>
      </td>
    </tr>
    ${end_letter}
    `
}

module.exports = {
  sendEmail
}
 