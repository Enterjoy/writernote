/* global SimpleSchema */

import { Mongo } from 'meteor/mongo';
import { CreatedAt } from '../../lib/default_schemas/CreatedAt.js';
import { ModifiedAt } from '../../lib/default_schemas/ModifiedAt.js';

export const Book = new Mongo.Collection('book');

const schema = new SimpleSchema({
  name: {
    type: String,
  },
  ownerId: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    defaultValue: false,
  },
  img: {
    type: String,
    optional: true,
    defaultValue: 'https://s3-ap-southeast-1.amazonaws.com/writenote-dev/book_placeholder.png',
  },
  createdAt: CreatedAt,
  modifiedAt: ModifiedAt,
});

Book.attachSchema(schema);
