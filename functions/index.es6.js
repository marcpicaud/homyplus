require('babel-polyfill');
const functions = require('firebase-functions');
const Expo = require('expo-server-sdk');
const firebaseAdmin = require('firebase-admin');

// The Firebase Admin SDK to access the Firebase Realtime Database.
firebaseAdmin.initializeApp(functions.config().firebase);

exports.notifyGuests = functions.https.onRequest((req, res) => {
  const { guests, organizer } = req.body;
  const messages = [];
  const expo = new Expo();


  // Fetch firebase users
  firebaseAdmin.database().ref('users').once('value', (snapshot) => {
    const users = snapshot.val();

    if (!users) {
      return console.error('There is no user');
    }

    for (let i=0; i<guests.length; i++) {
      const guestDataFromFirebase = users[guests[i]];
      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(guestDataFromFirebase['expoToken'])) {
        console.error(`Push token ${guestDataFromFirebase['expoToken']} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: guestDataFromFirebase['expoToken'],
        sound: 'default',
        body: users[organizer]['username'] + ' has invited you to an event',
        data: {},
      });
    }

    const chunks = expo.chunkPushNotifications(messages);
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          console.log(receipts);
        } catch (error) {
          console.error(error);
        }
      }
    })();

    res.end('ok');
  });
})