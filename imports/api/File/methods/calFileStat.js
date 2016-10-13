/* global SimpleSchema*/

import { Block } from '../../Block/Block.js';
import { File } from '../File.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const calFileStat = new ValidatedMethod({
  name: 'calFileStat',
  validate: new SimpleSchema({
    _id: {
      type: String,
    }
  }).validator(),
  run({_id}) {
    const str = Block.find({
      fileId: _id,
    }).map(obj => obj.content.text).join(' ');

    const characters = str.length;
    const words = str.split(/\S+/g).length - 1;

    File.update({
      _id,
    }, {
      $set: {
        characters,
        words,
      },
    });
  }
});
