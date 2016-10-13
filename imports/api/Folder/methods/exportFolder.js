/* global SimpleSchema */

import { Folder } from '../Folder.js';
import { File } from '../../File/File.js';
import { Block } from '../../Block/Block.js';
import { Random } from 'meteor/random';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const exportFolder = new ValidatedMethod({
  name: 'exportFolder',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    ids: {
      type: [String],
    },
  }).validator(),
  run({ids}) {
    // XXX: check permission here

    return Folder.find({
      _id: {
        $in: ids,
      }
    }, {
      sort: {
        index: 1,
      },
    }).map(fo => {
      return [
        {
          key: Random.id(10),
          text: fo.name,
          type: 'header-one',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
          index: 0,
        },
        ...File.find({
          folderId: fo._id,
          isDelete: false,
        }, {
          sort: {
            index: 1,
          },
        }).map(fi => {
          return [
            {
              key: Random.id(10),
              text: fi.name,
              type: 'header-two',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
              index: 0,
            },
            ...Block.find({
              fileId: fi._id,
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
        }),
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
    });
  },
});

// header-one
