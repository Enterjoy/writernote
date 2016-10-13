/* global SimpleSchema */

import { Block } from '../Block.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const updateBlocks = new ValidatedMethod({
  name: 'updateBlocks',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    changed: {
      type: [Object],
      blackbox: true,
    },
    deleted: {
      type: [Object],
      blackbox: true,
    },
    fileId: {
      type: String,
    }
  }).validator(),
  run({changed, deleted, fileId}) {
    deleted.forEach(block => {
      Block.remove({
        'content.key': block.key,
        fileId,
      });
    });

    changed.forEach(block => {
      Block.upsert({
        fileId,
        'content.key': block.key,
      }, {
        $set: {
          fileId,
          content: block,
          index: block.index,
        }
      });
    });
  },
});
