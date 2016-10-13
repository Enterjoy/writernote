/* global SimpleSchema*/

import { Folder } from '../Folder.js';
import { File } from '../../File/File.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const deleteFolder = new ValidatedMethod({
  name: 'deleteFolder',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    _id: {
      type: String,
    }
  }).validator(),
  run({_id}) {
    const f = Folder.findOne(_id);

    if (!f) {
      throw new Meteor.Error(404, 'Folder does not exist');
    }

    // XXX: not really a good check, should show more explicit logic
    if (f.folderType !== 'normal') {
      throw new Meteor.Error(403, 'Can not delete this folder');
    }

    const re = Folder.update({
      _id,
    }, {
      $set: {
        isDelete: true,
      }
    });

    Meteor.setTimeout(() => {
      const folders = f.getFolderDescendant().map(obj => obj._id);
      const files = f.getFileDescendant().map(obj => obj._id);

      Folder.update({
        _id: {
          $in: folders,
        }
      }, {
        $set: {
          isDelete: true,
        }
      }, {
        multi: true,
      }, () => {});

      File.update({
        _id: {
          $in: files,
        }
      }, {
        $set: {
          isDelete: true,
        }
      }, {
        multi: true,
      }, () => {});

    }, 0);

    return re;
  }
});
