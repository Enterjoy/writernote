/* global SimpleSchema */

import { Mongo } from 'meteor/mongo';
import { CreatedAt } from '../../lib/default_schemas/CreatedAt.js';
import { ModifiedAt } from '../../lib/default_schemas/ModifiedAt.js';

export const Share = new Mongo.Collection('share');

const schema = new SimpleSchema({
  userId: {
    type: String,
  },
  bookId: {
    type: String,
  },
  role: {
    type: String,
    allowedValues: ['owner', 'viewer', 'editor'],
  },
  createdAt: CreatedAt,
  modifiedAt: ModifiedAt,
});

Share.attachSchema(schema);
