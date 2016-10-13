/* global Accounts */

Accounts.validateLoginAttempt((obj) => {
  if (obj && obj.user && obj.user.isBlock) {
    throw new Meteor.Error('not-allowed', 'Your account has been blocked');
  }
  return true;
});
