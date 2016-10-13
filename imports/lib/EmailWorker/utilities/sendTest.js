// import DOM from 'react-dom/server';
// import React from 'react';
//
// import { TestEmail } from '../templates/TestEmail.jsx';
//
// import { mgInstance, EmailWorker } from '../EmailWorker.js';
//
// EmailWorker.sendTest = function() {
//   Meteor.defer(function() {
//     const props = {
//       name: 'Khang',
//     };
//
//     mgInstance.messages().send({
//       from: 'support@writernote.com',
//       to: 'khangnlh@dgroup.co',
//       subject: 'Writer Note: test mail',
//       html: DOM.renderToString(<TestEmail {...props} />),
//     }, (err) => {
//       if (err) {
//         throw err;
//       }
//     });
//   });
// };
//
// Meteor.methods({
//   sendTest() {
//     EmailWorker.sendTest();
//   }
// });
