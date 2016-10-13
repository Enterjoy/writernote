/* global SimpleSchema*/

import { Stat } from '../Stat.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const upsertStat = new ValidatedMethod({
  name: 'upsertStat',
  validate: new SimpleSchema({
    day: {
      type: Date,
    },
    userId: {
      type: String,
    },
    words: {
      type: Number,
    },
    characters: {
      type: Number,
    },
  }).validator(),
  run(data) {
    return Stat.upsert({
      userId: data.userId,
      day: data.day,
    }, {
      $set: {
        ...data,
      },
    });
  }
});
