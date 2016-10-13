/* global SimpleSchema */

import { File } from '../File.js';
import R from 'ramda';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const updateFile = new ValidatedMethod({
  name: 'updateFile',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
    name: {
      type: String,
    },
    parentId: {
      type: String,
    },
    position: {
      type: Number,
      decimal: true,
    },
  }).validator(),
  run({
    _id,
    name,
    parentId,
    position,
  }) {
    const userId = Meteor.userId();
    const obj = {
      name,
    };

    if (!userId) {
      throw new Meteor.Error('not-allowed', 'Do not have permission');
    }
    // XXX: check permission here

    const file = File.findOne(_id);

    if (!file) {
      throw new Meteor.Error('error', 'File does not exist');
    }

    if (file.folderId !== parentId) {
      obj.folderId = parentId;

      const files = File.find({
        folderId: parentId,
        isDelete: false,
      }, {
        sort: {
          index: 1,
        }
      }).fetch();

      if (files.length > 0) {
        if (position > 1) {
          const file1 = files[position - 2];
          const file2 = files[position - 1];

          obj.index = (file1.index + (file2 && file2.index || 2)) / 2;
        } else {
          const file1 = files[0];
          const file2 = files[1];

          File.update({
            _id: file1._id,
          }, {
            $set: {
              index: (file2 && file2.index || 2) / 2,
            },
          });

          obj.index = 0;
        }
      } else {
        obj.index = 0;
      }

    } else {
      const l = File.find({
        folderId: file.folderId,
        isDelete: false,
      }, {
        sort: {
          index: 1,
        }
      }).map((obj2, i) => ({
        value: obj2.index,
        index: i,
      }));

      const obj3 = R.find(R.propEq('value', file.index), l);

      if (obj3.index !== (position - 1)) {

        const files = File.find({
          folderId: parentId,
          isDelete: false,
        }, {
          sort: {
            index: 1,
          }
        }).fetch();

        if (files.length > 0) {
          if (position > 1) {
            const file1 = files[position - 2];
            const file2 = files[position - 1];

            obj.index = (file1.index + (file2 && file2.index || 2)) / 2;
          } else {
            const file1 = files[0];
            const file2 = files[1];

            File.update({
              _id: file1._id,
            }, {
              $set: {
                index: (file2 && file2.index || 2) / 2,
              },
            });

            obj.index = 0;
          }
        } else {
          obj.index = 0;
        }

      }
    }

    return File.update({
      _id,
    }, {
      $set: {
        ...obj,
      },
    });

  },
});
