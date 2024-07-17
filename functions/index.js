const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();

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

exports.verifyCode = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send({ success: false, message: 'Method Not Allowed' });
    }

    const { email, code } = req.body;

    try {
      const emailRef = admin.firestore().collection('emailVerifications').doc(email);
      const emailDoc = await emailRef.get();

      if (!emailDoc.exists) {
        return res.status(400).send({ success: false, message: 'Verification code not found' });
      }

      const data = emailDoc.data();
      const isCodeValid = data.verificationCode === code;

      if (isCodeValid) {
        // Optionally, you can delete the verification code document after verification
        await emailRef.delete();
      }

      res.status(200).send({ success: isCodeValid, message: isCodeValid ? 'Code verified successfully' : 'Invalid code' });
    } catch (error) {
      console.error('Error verifying code:', error);
      res.status(500).send({ success: false, message: 'Failed to verify code' });
    }
  });
});


// Send Verification Code Function
exports.sendVerificationCode = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send({ success: false, message: 'Method Not Allowed' });
    }

    const { email } = req.body;

    // Generate a random verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
      from: gmailEmail,
      to: email,
      subject: 'Email Verification Code',
      html: `
        <div style="font-family: Inter, Arial, sans-serif; background: #FFF; padding: 47px 48px; margin: auto; width: 100%; align-items: center; gap: 39px;">
          <div style="padding: 20px; text-align: center; align-items: center;">
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fmailimage.png?alt=media&token=fa3cbf16-fa97-4da2-a80b-59957e56fbc1" style="width: 583px; height: 200px;" alt="Third Space">
            <hr style="border: none; border-top: 1px solid #EEE; margin: 20px 0;">
            <h2 style="font-size: 24px; font-weight: 500; line-height: 32px; color: #000;">Hi, Welcome! <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fwave.png?alt=media&token=f0fa4b2b-cd0e-498c-9a73-f5cea175ae53"></img></h2>
            <p style="font-size: 14px; font-weight: 400; line-height: 22px; color: #333;">Please enter this code to verify your email address for Third Space:</p>
            <p style="font-size: 24px; font-weight: 600; line-height: 32px; color: #10241B; margin: 20px 0;">${verificationCode}</p>
            <p style="font-size: 14px; font-weight: 400; line-height: 22px; color: #333;">The code will expire in <span style="font-weight: 600;">5 minutes.</span></p>
            <p style="font-size: 14px; font-weight: 400; line-height: 22px; color: #333;">Best Regards,</p>
            <p style="font-size: 14px; font-weight: 500; line-height: 22px; color: #892CDC;">3S Team.</p>
          </div>
          <hr style="width: 584px; height: 1px; border: none; border-top: 1px solid #EEE; margin: 20px 0;">
          <div style="text-align: center;">
            <a href="https://x.com/BuildWith3S">  <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fx.png?alt=media&token=55bf09ff-5ae3-419a-ae43-e85c8c6a5982"></img></a>
            <a href="https://www.linkedin.com/company/thirdspace-3/">  <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2FLinkedIn.png?alt=media&token=3023cb89-8f07-4056-8da1-59701877ee5c"></img></a>
           <a href="https://discord.com/invite/dked3DEngT"> <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2FVector.png?alt=media&token=a541bac4-81cc-4fc6-9e4e-ce22b16db217"></img></a>
          </div>
          <hr style="width: 584px; height: 1px; border: none; border-top: 1px solid #EEE; margin: 0 20px;">
          <p style="font-size: 10px; font-weight: 400; line-height: normal; color: #000; text-align: center;">© 2024 Third Space. All rights reserved.</p>
          <p style="font-size: 10px; font-weight: 400; line-height: normal; color: #000; text-align: center;">
            You are receiving this mail because you registered to join the Third Space platform as a user. This also shows that you agree to our Terms of Use and Privacy Policies. If you no longer want to receive emails from us, click the unsubscribe link below to unsubscribe.
          </p>
          <p style="text-align: center;">
            <a href="https://3rd-space.io/#/privacy-policy" style="font-size: 10px; font-weight: 400; line-height: normal; color: #333; text-decoration: underline; margin: 0 5px;">Privacy Policy</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
              <circle cx="2.5" cy="2.5" r="2" fill="#D9D9D9"/>
            </svg>
            <a href="https://3rd-space.io/#/terms" style="font-size: 10px; font-weight: 400; line-height: normal; color: #333; text-decoration: underline; margin: 0 5px;">Terms of Service</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
              <circle cx="2.5" cy="2.5" r="2" fill="#D9D9D9"/>
            </svg>
            <a href="https://3rd-space.io/#/dashboard" style="font-size: 10px; font-weight: 400; line-height: normal; color: #333; text-decoration: underline; margin: 0 5px;">Unsubscribe</a>
          </p>
        </div>
      `
    };

    try {
      await mailTransport.sendMail(mailOptions);

      // Save the verification code to Firestore
      const emailRef = admin.firestore().collection('emailVerifications').doc(email);
      await emailRef.set({ verificationCode, createdAt: admin.firestore.FieldValue.serverTimestamp() });

      res.status(200).send({ success: true, message: 'Verification code sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ success: false, message: 'Failed to send verification code' });
    }
  });
});
// Function to send reset code via email
exports.sendResetCode = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { email } = req.body;

    // Generate a random reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
      from: gmailEmail,
      to: email,
      subject: 'Password Reset Code',
      html: `
        <div style="font-family: Inter, Arial, sans-serif; background: #FFF; padding: 47px 48px; margin: auto;  width: 100%; align-items: center; gap: 39px;">
          <div style="padding: 20px; text-align: center; align-items: center;">
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fmailimage.png?alt=media&token=fa3cbf16-fa97-4da2-a80b-59957e56fbc1" style="width: 583px; height: 200px;" alt="Third Space">

            <hr style="border: none; border-top: 1px solid #EEE; margin: 20px 0;">
            <h2 style="font-size: 24px; font-weight: 500; line-height: 32px; color: #000;">Hi, Welcome! <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fwave.png?alt=media&token=f0fa4b2b-cd0e-498c-9a73-f5cea175ae53"></img></h2>
            <p style="font-size: 14px; font-weight: 400; line-height: 22px; color: #333;">Please enter this code to verify your email address for Third Space:</p>
            <p style="font-size: 24px; font-weight: 600; line-height: 32px; color: #10241B; margin: 20px 0;">${resetCode}</p>
            <p style="font-size: 14px; font-weight: 400; line-height: 22px; color: #333;">The code will expire in <span style="font-weight: 600;">5 minutes.</span></p>
            <p style="font-size: 14px; font-weight: 400; line-height: 22px; color: #333;">Best Regards,</p>
            <p style="font-size: 14px; font-weight: 500; line-height: 22px; color: #892CDC;">3S Team.</p>
          </div>
          <hr style="width: 584px; height: 1px; border: none; border-top: 1px solid #EEE; margin: 20px 0;">
          <div style="text-align: center;">
            <a href="https://x.com/BuildWith3S">  <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fx.png?alt=media&token=55bf09ff-5ae3-419a-ae43-e85c8c6a5982"></img></a>
            <a href="https://www.linkedin.com/company/thirdspace-3/">  <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2FLinkedIn.png?alt=media&token=3023cb89-8f07-4056-8da1-59701877ee5c"></img></a>
           <a href="https://discord.com/invite/dked3DEngT"> <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2FVector.png?alt=media&token=a541bac4-81cc-4fc6-9e4e-ce22b16db217"></img></a>
          </div>
          <hr style="width: 584px; height: 1px; border: none; border-top: 1px solid #EEE; margin: 0 20px;">
          <p style="font-size: 10px; font-weight: 400; line-height: normal; color: #000; text-align: center;">© 2024 Third Space. All rights reserved.</p>
          <p style="font-size: 10px; font-weight: 400; line-height: normal; color: #000; text-align: center;">
            You are receiving this mail because you registered to join the Third Space platform as a user. This also shows that you agree to our Terms of Use and Privacy Policies. If you no longer want to receive emails from us, click the unsubscribe link below to unsubscribe.
          </p>
          <p style="text-align: center;">
            <a href="https://3rd-space.io/#/privacy-policy" style="font-size: 10px; font-weight: 400; line-height: normal; color: #333; text-decoration: underline; margin: 0 5px;">Privacy Policy</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
              <circle cx="2.5" cy="2.5" r="2" fill="#D9D9D9"/>
            </svg>
            <a href="https://3rd-space.io/#/terms" style="font-size: 10px; font-weight: 400; line-height: normal; color: #333; text-decoration: underline; margin: 0 5px;">Terms of Service</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
              <circle cx="2.5" cy="2.5" r="2" fill="#D9D9D9"/>
            </svg>
            <a href="https://3rd-space.io/#/dashboard" style="font-size: 10px; font-weight: 400; line-height: normal; color: #333; text-decoration: underline; margin: 0 5px;">Unsubscribe</a>
          </p>
        </div>
      `
    };
    


    try {
      await mailTransport.sendMail(mailOptions);

      // Save the reset code to Firestore
      const emailRef = admin.firestore().collection('passwordResets').doc(email);
      await emailRef.set({ resetCode });

      res.status(200).send({ success: true, message: 'Reset code sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ success: false, message: 'Failed to send reset code' });
    }
  });
});
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
