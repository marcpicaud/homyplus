'use strict';

require('babel-polyfill');
var functions = require('firebase-functions');
var Expo = require('expo-server-sdk');
var firebaseAdmin = require('firebase-admin');

// The Firebase Admin SDK to access the Firebase Realtime Database.
firebaseAdmin.initializeApp(functions.config().firebase);

exports.notifyGuests = functions.https.onRequest(function (req, res) {
  var _req$body = req.body,
      guests = _req$body.guests,
      organizer = _req$body.organizer;

  var messages = [];
  var expo = new Expo();

  // Fetch firebase users
  firebaseAdmin.database().ref('users').once('value', function (snapshot) {
    var users = snapshot.val();

    if (!users) {
      return console.error('There is no user');
    }

    for (var i = 0; i < guests.length; i++) {
      var guestDataFromFirebase = users[guests[i]];
      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(guestDataFromFirebase['expoToken'])) {
        console.error('Push token ' + guestDataFromFirebase['expoToken'] + ' is not a valid Expo push token');
        continue;
      }
      messages.push({
        to: guestDataFromFirebase['expoToken'],
        sound: 'default',
        body: users[organizer]['username'] + ' has invited you to an event',
        data: {}
      });
    }

    var chunks = expo.chunkPushNotifications(messages);
    (function _callee() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk, receipts;

      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Send the chunks to the Expo push notification service. There are
              // different strategies you could use. A simple one is to send one chunk at a
              // time, which nicely spreads the load out over time:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = chunks[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 20;
                break;
              }

              chunk = _step.value;
              _context.prev = 7;
              _context.next = 10;
              return regeneratorRuntime.awrap(expo.sendPushNotificationsAsync(chunk));

            case 10:
              receipts = _context.sent;

              console.log(receipts);
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](7);

              console.error(_context.t0);

            case 17:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 20:
              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t1 = _context['catch'](3);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 26:
              _context.prev = 26;
              _context.prev = 27;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 29:
              _context.prev = 29;

              if (!_didIteratorError) {
                _context.next = 32;
                break;
              }

              throw _iteratorError;

            case 32:
              return _context.finish(29);

            case 33:
              return _context.finish(26);

            case 34:
            case 'end':
              return _context.stop();
          }
        }
      }, null, undefined, [[3, 22, 26, 34], [7, 14], [27,, 29, 33]]);
    })();

    res.end('ok');
  });
});