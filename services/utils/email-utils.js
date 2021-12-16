const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_TOKEN)

async function sendEmail(emailToSend,onboarding_uuid){
  return new Promise((resolve,reject)=>{
   let mailOptions = {
       from: 'no-reply@makor-capital.com <no-reply@makor-capital.com>',
       to: emailToSend,
       subject: "Makor: Onboarding",
       html:mailContent(onboarding_uuid)
     }

   
  sgMail.send(mailOptions, (err,success)=>{
       if(err){
          console.log('inside error');
          resolve(false)
         
        }else{
          console.log("Email Sent Successfully");
          resolve(true)
        }
      })

  })
 }

 
const mailContent = (onboarding_uuid) => {
  return `
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
        text-align:left;
      }
      body {
        font-size: 17px;
        color: #333;
        text-align:left;
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
      
      .img-container{
      display: flex;
      justify-content:center;
      width:100vw;
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
    </style>+
  </head>
  <body style="text-align:left">
    <div id="header">
      <table>
        <tbody>
          <tr>
            <td>
            <div style="display:flex; justify-content:flex-start; width:100vw;" class="img-container">
              <img height=250 width=400 src="https://miro.medium.com/max/1400/1*8w9Bc4E_BI0ijqd_PP09jQ.png" />
                          </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center">
      <table id="container">
        <tbody>
	
    <tr>
      <td id="credeantials">
        <p>
        Hello,
    </p><br />
    <p>
        Thank you for getting in touch with Makor Capital.
    </p><br />
    <p>
        As part of our commitment to remain a trusted cryptocurrency service, all of our counter-parties must be verified by our compliance department.
    </p><br />
    <p>
        Please find below a link to our onboarding form:
   </p>
   <p>
        <a href='${process.env.BASE_URL}/${onboarding_uuid}'>Submit onboarding documentation</a>
   </p><br />
   <p>
        Makor is fully committed to protecting client confidentiality. Makor Capital guarantees that it will ensure that all the information provided will remain strictly confidential.
   </p>
   <p>
        Kindly let us know if you need further assistance,
   </p>
      </td>
    </tr>

          <tr>
            <td id="info">
            <br />
            <br />
              <p >Sincerely</p>
              <p>Makor Compliance Team</p>
              <p><b>Makor Capital London Ltd</b></p>
              <p>6th Floor, 7/8 Savile Row</p>
              <p>London W1S 3PE</p>
              <p>+44 (0) 20 7290 5777</p>
              <p>http://www.makor-capital.com</p>
            </td>
          </tr>
          <tr>
            <td id="disclamer">
              <p><b>Disclaimer</b></p>
              <br />
              <p>
                Makor Capital Limited is an Appointed Representative of
                Makor Capital London Ltd which is authorised and regulated by
                the Financial Conduct Authority (625054).
              </p>
              <p>
                The information contained in this note issued by Makor
                Capital Limited is not intended to be advice nor a
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
</html>`
}

module.exports = {
  sendEmail
}
 