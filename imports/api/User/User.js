/* global SimpleSchema*/

import { CreatedAt } from '../../lib/default_schemas/CreatedAt.js';
import { ModifiedAt } from '../../lib/default_schemas/ModifiedAt.js';

const ProfileSchema = new SimpleSchema({
  firstName: {
    type: String,
    optional: true,
  },
  lastName: {
    type: String,
    optional: true,
  },
  avatar: {
    type: String,
    defaultValue: 'http://findicons.com/files/icons/1072/face_avatars/300/a02.png'
  },
});

const EmailSchema = new SimpleSchema({
  address: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  verified: {
    type: Boolean,
    optional: true,
  }
});

const UserSchema = new SimpleSchema({
  services: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  emails: {
    type: [EmailSchema],
    optional: true,
  },
  profile: {
    type: ProfileSchema,
  },
  status: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  roles: {
    type: [String],
    defaultValue: [],
  },
  isBlock: {
    type: Boolean,
    defaultValue: false,
  },
  createdAt: CreatedAt,
  modifiedAt: ModifiedAt,
});

Meteor.users.attachSchema(UserSchema);

export const User = Meteor.users;
