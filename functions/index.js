const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

// Setting up Gmail configuration using environment variables
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// Initialize nodemailer transport
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Initialize the Gmail API
const gmail = google.gmail({version: 'v1', auth: new google.auth.GoogleAuth({
  credentials: {
    client_email: functions.config().gmail.client_email,
    private_key: functions.config().gmail.private_key.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/gmail.modify']
})});

exports.sendEmailOnFirestoreWrite = functions.firestore
  .document('reports/{reportId}')
  .onCreate(async (snap, context) => {
    const newData = snap.data();

    const mailOptions = {
      from: gmailEmail,
      to: gmailEmail,  // Specify the recipient's email address
      subject: 'New Report Notification',
      text: `A new report has been submitted: Description: ${newData.description}, Image URL: ${newData.imageUrl}`
    };

    try {
      const sendResponse = await mailTransport.sendMail(mailOptions);
      console.log('Email sent successfully');

      // Extract the message ID from the send response (you need to ensure you get this ID correctly)
      const messageId = sendResponse.messageId; // Adjust this according to actual response structure

      // Apply the Gmail label
      await gmail.users.messages.modify({
        userId: 'me',
        id: messageId,
        requestBody: {
          addLabelIds: ['Feedback'] // Replace 'LabelId' with the actual ID of the "Feedback" label
        }
      });
      console.log('Label applied successfully');
    } catch (error) {
      console.error('There was an error while sending the email or applying the label:', error);
    }
  });
