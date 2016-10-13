/* global SimpleSchema */

import { Mongo } from 'meteor/mongo';
import { CreatedAt } from '../../lib/default_schemas/CreatedAt.js';
import { ModifiedAt } from '../../lib/default_schemas/ModifiedAt.js';

export const File = new Mongo.Collection('file');

const schema = new SimpleSchema({
  words: {
    type: Number,
    defaultValue: 0,
  },
  characters: {
    type: Number,
    defaultValue: 0,
  },
  name: {
    type: String,
  },
  folderId: {
    type: String,
  },
  isDelete: {
    type: Boolean,
    defaultValue: false,
  },
  fileType: {
    type: String,
    defaultValue: 'normal',
    allowedValues: [
      'normal',
      'settings',
    ],
  },
  index: {
    type: Number,
    decimal: true,
  },
  createdAt: CreatedAt,
  modifiedAt: ModifiedAt,
});

File.attachSchema(schema);
