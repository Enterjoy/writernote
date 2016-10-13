/* global SimpleSchema */

import { File } from '../File.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const deleteFile = new ValidatedMethod({
  name: 'deleteFile',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
  }).validator(),
  run({_id}) {
    // XXX: check permission here

    return File.update({
      _id
    }, {
      $set: {
        isDelete: true,
      }
    });
  },
});
