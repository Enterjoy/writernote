/* global SimpleSchema */

import { Mongo } from 'meteor/mongo';
import { CreatedAt } from '../../lib/default_schemas/CreatedAt.js';
import { ModifiedAt } from '../../lib/default_schemas/ModifiedAt.js';

export const Folder = new Mongo.Collection('folder');

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
  index: {
    type: Number,
    decimal: true,
  },
  parentId: {
    type: String,
    optional: true,
  },
  bookId: {
    type: String,
  },
  synopsis: {
    type: String,
    defaultValue: '',
  },
  label: {
    type: String,
    // allowedValues: ['label1', 'label2', 'label3'],
    defaultValue: 'label1',
  },
  isDelete: {
    type: Boolean,
    defaultValue: false,
  },
  status: {
    type: String,
    allowedValues: ['working', 'done'],
    defaultValue: 'working',
  },
  folderType: {
    type: String,
    allowedValues: [
      'normal',
      'root',
      'trash',
      // 'research',
      'template',
      'settings',
    ],
    defaultValue: 'normal',
  },
  notes: {
    type: String,
    defaultValue: '',
  },
  createdAt: CreatedAt,
  modifiedAt: ModifiedAt,
});

Folder.attachSchema(schema);
