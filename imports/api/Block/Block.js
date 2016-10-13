/* global SimpleSchema */

import { Mongo } from 'meteor/mongo';
import { CreatedAt } from '../../lib/default_schemas/CreatedAt.js';
import { ModifiedAt } from '../../lib/default_schemas/ModifiedAt.js';

export const Block = new Mongo.Collection('block');

const schema = new SimpleSchema({
  content: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  index: {
    type: Number,
    decimal: true,
  },
  fileId: {
    type: String,
  },
  holderId: {
    type: String,
    optional: true,
  },
  createdAt: CreatedAt,
  modifiedAt: ModifiedAt,
});

Block.attachSchema(schema);
