const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Setting up Gmail configuration using environment variables
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const clientEmail = functions.config().gmail.client_email;
const privateKey = functions.config().gmail.private_key.replace(/\\n/g, '\n');

// Initialize nodemailer transport
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Initialize the Gmail API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey
  },
  scopes: ['https://www.googleapis.com/auth/gmail.modify']
});

const gmail = google.gmail({ version: 'v1', auth });

// Function to send email on new report creation
exports.sendEmailOnFirestoreWrite = functions.firestore
  .document('reports/{reportId}')
  .onCreate(async (snap, context) => {
    const newData = snap.data();
    
    // Assuming the image is accessible via a URL stored in newData.imageUrl
    const imageUrl = newData.imageUrl;

    const mailOptions = {
      from: gmailEmail,
      to: gmailEmail,  // Specify the recipient's email address
      subject: 'New Report Notification',
      html: `
        <p>A new report has been submitted:</p>
        <p>Description: ${newData.description}</p>
        <p>Image:</p>
        <img src="${imageUrl}" alt="Report Image" style="width:600px; height:auto;"/>
      `
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



// Function to send email on new newsletter subscription
exports.sendEmailsOnSubscription = functions.firestore
  .document('NewsletterSubscriptions/{subscriptionId}')
  .onCreate(async (snap, context) => {
    const newSubscription = snap.data();

    const adminMailOptions = {
      from: gmailEmail,
      to: gmailEmail, // Admin email
      subject: 'New Newsletter Subscription',
      html: `
        <p>You have a new newsletter subscription:</p>
        <p><strong>Email:</strong> ${newSubscription.email}</p>
        <br/><br/>
        Check the Firebase console for more information.
      `
    };

    try {
      // Send email to admin
      await mailTransport.sendMail(adminMailOptions);
      console.log('Notification email sent to admin');

      // Search for the recently sent email to get its message ID
      const searchResponse = await gmail.users.messages.list({
        userId: 'me',
        q: 'subject:"New Newsletter Subscription"',
        maxResults: 1
      });

      if (searchResponse.data.messages && searchResponse.data.messages.length > 0) {
        const messageId = searchResponse.data.messages[0].id;

        // Apply the Gmail label
        await gmail.users.messages.modify({
          userId: 'me',
          id: messageId,
          requestBody: {
            addLabelIds: ['LabelId'] // Replace 'LabelId' with the actual ID of the label
          }
        });
        console.log('Label applied successfully');
      } else {
        console.log('No message found to label');
      }
    } catch (error) {
      console.error('There was an error while sending the emails or applying the label:', error);
    }
  });
