// import { Accounts } from 'meteor/accounts-base';

Accounts.urls.resetPassword = function(token) {
  return Meteor.absoluteUrl(`reset-password/${token}`);
};
