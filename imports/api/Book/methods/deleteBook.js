/* global SimpleSchema*/

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { Book } from '../Book.js';

export const deleteBook = new ValidatedMethod({
  name: 'deleteBook',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    _id: {
      type: String,
    }
  }).validator(),
  run({_id}) {
    // XXX: check more permission here

    Book.update({
      _id,
    }, {
      $set: {
        isDeleted: true,
      },
    });
  },
});
