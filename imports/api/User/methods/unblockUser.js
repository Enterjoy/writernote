/* global SimpleSchema*/

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { User } from '../User.js';

export const unblockUser = new ValidatedMethod({
  name: 'unblockUser',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  checkRoles: {
    roles: ['admin'],
    rolesError: {
      error: 'not-allowed',
      reason: 'Do not have permission',
    }
  },
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
  }).validator(),
  run({_id}) {
    return User.update({
      _id,
    }, {
      $set: {
        isBlock: false,
      }
    });
  },
});
