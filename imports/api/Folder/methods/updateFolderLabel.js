/* global SimpleSchema */

import { Folder } from '../Folder.js';
import { Label } from '../../Label/Label.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const updateFolderLabel = new ValidatedMethod({
  name: 'updateFolderLabel',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
    label: {
      type: String,
    },
  }).validator(),
  run({_id, label}) {
    // XXX: check permission here

    const l = Label.findOne({
      bookId: _id,
      name: label,
    });

    if (!l) {
      const f = Folder.findOne(_id);
      Label.insert({
        bookId: f && f.bookId,
        name: label,
      });
    }

    return Folder.update({
      _id,
    }, {
      $set: {
        label,
      },
    });
  },
});
