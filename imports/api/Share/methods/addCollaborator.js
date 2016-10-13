/* global SimpleSchema*/

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

import { Accounts } from 'meteor/accounts-base';
import { Share } from '../Share.js';
import { Book } from '../../Book/Book.js';

import { sendInviation } from '../../../lib/EmailWorker/EmailWorker.js';
// import { FlowRouter as FR } from 'meteor/kadira:flow-router';

const setToken = function(userId, email) {
  const token = Random.secret();
  const when = new Date();
  const user = Meteor.users.findOne(userId);

  const tokenRecord = {
    token: token,
    email: email,
    when: when
  };

  Meteor.users.update(userId, {
    $set: {
      'services.password.reset': tokenRecord
    }
  });

  // before passing to template, update user object with new token
  Meteor._ensure(user, 'services', 'password').reset = tokenRecord;

  return token;
};

export const addCollaborator = new ValidatedMethod({
  name: 'addCollaborator',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    bookId: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
    },
  }).validator(),
  run({bookId, email, role}) {
    const actor = Meteor.user();
    let link = '';

    if (!actor) {
      throw new Meteor.Error('not-allowed', 'Do not have permission');
    }

    const book = Book.findOne({
      _id: bookId,
      isDeleted: false,
    });

    if (!book) {
      throw new Meteor.Error('error', 'Book does not exist');
    }

    const user = Accounts.findUserByEmail(email);
    let userId = user && user._id;

    if (!user) {
      userId = Accounts.createUser({
        email,
        profile: {
          firstName: 'firstName',
          lastName: 'lastName',
        },
      });

      const token = setToken(userId, email);
      link = Meteor.absoluteUrl(`invite/${token}/${bookId}`);
    } else {
      if (!user.services.password &&
        !user.services.google &&
        !user.services.facebook
      ) {

        const token = setToken(userId, email);

        link = Meteor.absoluteUrl(`invite/${token}/${bookId}`);

      } else {
        link = Meteor.absoluteUrl(`novel-detail/${bookId}`);
      }
    }

    sendInviation({
      to: email,
      user: actor.fullName(),
      book: book && book.name,
      link,
    });


    return Share.insert({
      bookId,
      role,
      userId,
    });

  },
});
