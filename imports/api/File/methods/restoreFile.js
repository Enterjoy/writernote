/* global SimpleSchema */

import { File } from '../File.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const restoreFile = new ValidatedMethod({
  name: 'restoreFile',
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

    const f = File.findOne(_id);

    if (!f || f.doesHaveDeletedParent()) {
      throw new Meteor.Error(403, 'Can not restore this file');
    }

    return File.update({
      _id
    }, {
      $set: {
        isDelete: false,
      }
    });
  },
});
