import DOM from 'react-dom/server';
import React from 'react';

import { Invitation } from '../templates/Invitation.jsx';

import mailgun from 'mailgun-js';

export function sendInviation(data) {
  check(data, {
    to: String,
    user: String,
    book: String,
    link: String,
  });

  const {
    to,
  } = data;

  Meteor.defer(function() {
    const mg = mailgun({
      apiKey: Meteor.settings.private.mailgun.key,
      domain: Meteor.settings.private.mailgun.domain,
    });

    mg.messages().send({
      from: 'support@writernote.com',
      to,
      subject: 'Writer Note: Invite to edit',
      html: DOM.renderToString(<Invitation {...data} />),
    }, (err) => {
      if (err) {
        throw err;
      }
    });
  });
}
