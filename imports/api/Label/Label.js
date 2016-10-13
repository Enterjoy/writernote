/* global SimpleSchema */

import { Mongo } from 'meteor/mongo';
import { CreatedAt } from '../../lib/default_schemas/CreatedAt.js';
import { ModifiedAt } from '../../lib/default_schemas/ModifiedAt.js';

export const Label = new Mongo.Collection('label');

const schema = new SimpleSchema({
  name: {
    type: String,
  },
  bookId: {
    type: String,
  },
  createdAt: CreatedAt,
  modifiedAt: ModifiedAt,
});

Label.attachSchema(schema);
