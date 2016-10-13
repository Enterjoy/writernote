/* global SimpleSchema */

import { Folder } from '../Folder.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const newFolder = new ValidatedMethod({
  name: 'newFolder',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    name: {
      type: String,
    },
    parentId: {
      type: String,
    },
    bookId: {
      type: String,
    },
  }).validator(),
  run(data) {
    // XXX: check permission here

    const trash = Folder.findOne({
      _id: data.parentId,
      folderType: 'trash',
    });

    if (trash) {
      throw new Meteor.Error(403, 'Can not create item in Trash');
    }

    const parent = Folder.findOne(data.parentId);

    if (!parent || parent.getLevel() >= 2) {
      throw new Meteor.Error(403, 'Can not create item');
    }

    const sibling = Folder.findOne({
      parentId: data.parentId,
      bookId: data.bookId,
    }, {
      sort: {
        index: -1,
      }
    });

    const index = sibling && sibling.index + 1 || 0;

    return Folder.insert({
      index,
      ...data,
    });
  },
});
