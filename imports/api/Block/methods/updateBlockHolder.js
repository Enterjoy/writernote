/* global SimpleSchema */

import { Block } from '../Block.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const updateBlockHolder = new ValidatedMethod({
  name: 'updateBlockHolder',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    blockId: {
      type: String,
    },
  }).validator(),
  run({blockId}) {
    const b = Block.findOne(blockId);
    const userId = Meteor.userId();

    if (!b) {
      throw new Meteor.Error(403, 'Block does not exist');
    }

    if (b.holderId) {
      throw new Meteor.Error(403, 'Another person is editing this block');
    }

    Block.update({
      _id: blockId,
    }, {
      $set: {
        holderId: userId,
      }
    });

    Block.update({
      _id: {
        $ne: blockId,
      },
      holderId: userId,
    }, {
      $unset: {
        holderId: '',
      },
    });

  },
});
