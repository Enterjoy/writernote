/* global SimpleSchema*/

import { Folder } from '../Folder.js';
import { File } from '../../File/File.js';
import { Block } from '../../Block/Block.js';
import R from 'ramda';

import { ValidatedMethod } from 'meteor/mdg:validated-method';

// import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const calStat = new ValidatedMethod({
  name: 'calStat',
  // mixins: [LoggedInMixin],
  // checkLoggedInError: {
  //   error: 'notLogged',
  //   reason: 'Do not have permission',
  // },
  validate: new SimpleSchema({
    _id: {
      type: String,
    }
  }).validator(),
  run({_id}) {
    const folder = Folder.findOne(_id);

    if (!folder) {
      throw new Meteor.Error('error', 'Folder does not exist');
    }

    if (folder.folderType === 'normal') {
      const str = File.find({
        folderId: _id,
        isDelete: false,
      }).map(fi => {
        return Block.find({
          fileId: fi._id,
        }).map(obj => obj.content.text).join(' ');
      }).join(' ');

      const characters = str.length;
      const words = str.split(/\S+/g).length - 1;

      Folder.update({
        _id,
      }, {
        $set: {
          words,
          characters,
        }
      });

      Meteor.call('calStat', {
        _id: folder.parentId,
      });

    } else if (folder.folderType === 'root') {
      const folders = Folder.find({
        parentId: _id,
        isDelete: false,
      }).fetch();

      const words = R.compose(
        R.sum,
        R.pluck('words'),
      )(folders);

      const characters = R.compose(
        R.sum,
        R.pluck('characters'),
      )(folders);

      Folder.update({
        _id,
      }, {
        $set: {
          words,
          characters,
        }
      });
    }
  }
});
