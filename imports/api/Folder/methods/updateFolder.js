/* global SimpleSchema*/

import { Folder } from '../Folder.js';
import R from 'ramda';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const updateFolder = new ValidatedMethod({
  name: 'updateFolder',
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

    const folder = Folder.findOne(_id);

    if (!folder) {
      throw new Meteor.Error('error', 'Folder does not exist');
    }

    if (folder.type === 'normal') {
      if (folder.parentId !== parentId) {
        obj.parentId = parentId;

        const folders = Folder.find({
          parentId: parentId,
          isDelete: false,
        }, {
          sort: {
            index: 1,
          }
        }).fetch();

        if (folders.length > 0) {
          if (position > 1) {
            const file1 = folders[position - 2];
            const file2 = folders[position - 1];

            obj.index = (file1.index + (file2 && file2.index || 2)) / 2;
          } else {
            const file1 = folders[0];
            const file2 = folders[1];

            Folder.update({
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
        const l = Folder.find({
          parentId: folder.parentId,
          isDelete: false,
        }, {
          sort: {
            index: 1,
          }
        }).map((obj2, i) => ({
          value: obj2.index,
          index: i,
        }));

        const obj3 = R.find(R.propEq('value', folder.index), l);

        if (obj3.index !== (position - 1)) {

          const files = Folder.find({
            parentId: parentId,
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

              Folder.update({
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
    }

    return Folder.update({
      _id,
    }, {
      $set: {
        ...obj,
      },
    });

  },
});
