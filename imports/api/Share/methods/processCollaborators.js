/* global SimpleSchema*/

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

import { Share } from '../Share.js';
import { Book } from '../../Book/Book.js';
import { Accounts } from 'meteor/accounts-base';

export const processCollaborators = new ValidatedMethod({
  name: 'processCollaborators',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    collaborators: {
      type: [Object],
    },
    'collaborators.$._id': {
      type: String,
    },
    'collaborators.$.email': {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
    'collaborators.$.role': {
      type: String,
      allowedValues: ['editor', 'viewer'],
    },
    'collaborators.$.type': {
      type: String,
      allowedValues: ['update', 'new'],
    },
    bookId: {
      type: String,
    },
  }).validator(),
  run({collaborators, bookId}) {
    const book = Book.findOne(bookId);

    if (!book) {
      throw new Meteor.Error('error', 'Book does not exist');
    }
    const updateCol = collaborators.filter(obj => obj.type === 'update');

    const newCol = collaborators.filter(obj => obj.type === 'new')[0];

    if (newCol) {
      const user = Accounts.findUserByEmail(newCol.email);

      if (!user || !book.isSharedWith(user._id)) {
        Meteor.call('addCollaborator', {
          bookId,
          email: newCol.email,
          role: newCol.role,
        });
      } else {
        throw new Meteor.Error('error', `This user ${newCol.email} is already a collaborator`);
      }
    }

    if (updateCol.length > 0) {
      updateCol.forEach(obj => {
        Share.update({
          _id: obj._id,
        }, {
          $set: {
            role: obj.role,
          },
        });
      });
    }
  },
});
