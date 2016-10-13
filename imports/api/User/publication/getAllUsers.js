import { User } from '../User.js';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('getAllUsers', function() {

  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error('not-allowed', 'Do not have permission');
  }

  if (!Roles.userIsInRole(userId, 'admin')) {
    throw new Meteor.Error('not-allowed', 'Do not have permission');
  }

  // XXX: have to limit amount of data here

  return User.find({}, {
    fields: {
      emails: 1,
      profile: 1,
      isBlock: 1,
    }
  });
});
