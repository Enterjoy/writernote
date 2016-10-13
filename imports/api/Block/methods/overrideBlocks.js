/* global SimpleSchema */

import { Block } from '../Block.js';
import { File } from '../../File/File.js';
import { Stat } from '../../Stat/Stat.js';
import R from 'ramda';
import diff from 'diff';
import moment from 'moment';

import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const overrideBlocks = new ValidatedMethod({
  name: 'overrideBlocks',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    blocks: {
      type: [Object],
      blackbox: true,
    },
    fileId: {
      type: String,
    }
  }).validator(),
  run({blocks, fileId}) {
    // XXX: check more permission here
    const userId = Meteor.userId();
    const file = File.findOne(fileId);
    const today = moment().startOf('day').toDate();

    if (!file) {
      throw new Meteor.Error('error', 'File does not exist');
    }

    const stat = Stat.findOne({
      userId,
      day: today,
    });

    let updateChar = stat && stat.characters || 0;
    let updateWord = stat && stat.words || 0;

    blocks.forEach(obj => {
      const b = Block.findOne({
        'content.key': obj.key,
      });

      if (b) {
        const oldText = b.content.text;
        const newText = obj.text;

        const reChar = diff.diffChars(oldText, newText, {
          ignoreWhitespace: true,
        });

        if (reChar.length > 1) {
          reChar.forEach(obj2 => {
            if (obj2.added) {
              updateChar += obj2.value.trim().length;
              updateWord += obj2.value.trim().split(/\S+/g).length - 1;
            }
          });
        }

      }
    });

    const newBlocks = R.filter(function(obj) {
      return !Block.findOne({
        'content.key': obj.key,
      });
    })(blocks);

    const str = newBlocks.map(obj => obj.text).join(' ').trim();

    updateChar += str.length;
    updateWord += str.split(/\S+/g).length - 1;

    Block.remove({
      fileId,
    });

    // XXX: should use bulk insert here
    blocks.forEach(block => {
      Block.insert({
        fileId,
        index: block.index,
        content: block,
      });
    });

    Meteor.defer(() => {
      Meteor.call('calStat', {
        _id: file.folderId,
      });
    });

    Meteor.defer(() => {
      Meteor.call('calFileStat', {
        _id: fileId,
      });
    });

    Meteor.defer(() => {
      Meteor.call('upsertStat', {
        day: today,
        userId,
        words: updateWord,
        characters: updateChar,
      });
    });
  },
});
