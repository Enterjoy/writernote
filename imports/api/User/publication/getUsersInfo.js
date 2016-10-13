import { User } from '../User.js';

Meteor.publish('getUsersInfo', function(ids) {
  check(ids, [String]);

  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error('not-allowed', 'Do not have permission');
  }

  return User.find({
    _id: {
      $in: ids,
    }
  }, {
    fields: {
      profile: 1,
      emails: 1,
    }
  });
});
