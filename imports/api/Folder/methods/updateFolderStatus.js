/* global SimpleSchema */

import { Folder } from '../Folder.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const updateFolderStatus = new ValidatedMethod({
  name: 'updateFolderStatus',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
    status: {
      type: String,
      allowedValues: ['working', 'done'],
    },
  }).validator(),
  run({_id, status}) {
    // XXX: check permission here

    return Folder.update({
      _id,
    }, {
      $set: {
        status,
      },
    });
  },
});
