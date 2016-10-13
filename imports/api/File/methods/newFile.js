/* global SimpleSchema */

import { File } from '../File.js';
import { Folder } from '../../Folder/Folder.js';
import { Block } from '../../Block/Block.js';
import { Random } from 'meteor/random';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const newFile = new ValidatedMethod({
  name: 'newFile',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    name: {
      type: String,
    },
    folderId: {
      type: String,
    },
    template: {
      type: String,
      optional: true,
    },
  }).validator(),
  run(data) {
    // XXX: check permission here

    const parent = Folder.findOne(data.folderId);

    if (!parent || parent.getLevel() >= 2) {
      throw new Meteor.Error(403, 'Can not create item');
    }

    const sibling = File.findOne({
      folderId: data.folderId,
    }, {
      sort: {
        index: -1,
      }
    });

    const index = sibling && sibling.index + 1 || 0;

    const file = {
      index,
      ...data,
    };

    if (parent.folderType === 'settings') {
      file.fileType = 'settings';
    }

    const fileId = File.insert(file);

    Meteor.defer(() => {
      if (data.template) {
        const template = File.findOne(data.template);

        if (!template) {
          throw new Meteor.Error('error', 'Template does not exist');
        }

        Block.find({
          fileId: template._id,
        }).map(obj => {
          const re = {
            ...obj,
          };

          re.fileId = fileId;
          re.content.key = Random.id(10);
          delete re._id;

          return {
            ...re,
          };
        }).forEach(obj => Block.insert(obj));
      }
    });

    return fileId;
  },
});
