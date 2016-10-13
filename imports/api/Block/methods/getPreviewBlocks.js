/* global SimpleSchema */

import { File } from '../../File/File.js';
import { Block } from '../Block.js';
import { Random } from 'meteor/random';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const getPreviewBlocks = new ValidatedMethod({
  name: 'getPreviewBlocks',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    id: {
      type: String,
    },
  }).validator(),
  run({id}) {
    // XXX: check permission here
    const file = File.findOne(id);

    if (!file) {
      throw new Meteor.Error('error', 'File does not exist');
    }

    return [
      {
        key: Random.id(10),
        text: file.name,
        type: 'header-two',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
        index: 0,
      },
      ...Block.find({
        fileId: file._id,
      }, {
        sort: {
          index: 1,
        },
      }).map(obj => obj.content),
      {
        key: Random.id(10),
        text: 'page_break',
        type: 'header-one',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
        index: 0,
      },
    ];
  }
});

// header-one
