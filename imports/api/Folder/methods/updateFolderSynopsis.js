/* global SimpleSchema */

import { Folder } from '../Folder.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const updateFolderSynopsis = new ValidatedMethod({
  name: 'updateFolderSynopsis',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
    synopsis: {
      type: String,
      optional: true,
    },
  }).validator(),
  run({_id, synopsis}) {
    // XXX: check permission here

    return Folder.update({
      _id,
    }, {
      $set: {
        synopsis,
      },
    });
  },
});
