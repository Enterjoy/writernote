/* global SimpleSchema */

import { Block } from '../Block.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const getBlockByFileId = new ValidatedMethod({
  name: 'getBlockByFileId',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    fileId: {
      type: String,
    },
  }).validator(),
  run({fileId}) {
    return Block.find({
      fileId,
    }, {
      sort: {
        index: 1,
      }
    }).fetch();
  },
});
