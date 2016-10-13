/* global SimpleSchema */

import { Mongo } from 'meteor/mongo';
import { CreatedAt } from '../../lib/default_schemas/CreatedAt.js';
import { ModifiedAt } from '../../lib/default_schemas/ModifiedAt.js';

export const Stat = new Mongo.Collection('stat');

const schema = new SimpleSchema({
  day: {
    type: Date,
  },
  userId: {
    type: String,
  },
  words: {
    type: Number,
    defaultValue: 0,
  },
  characters: {
    type: Number,
    defaultValue: 0,
  },
  createdAt: CreatedAt,
  modifiedAt: ModifiedAt,
});

Stat.attachSchema(schema);
