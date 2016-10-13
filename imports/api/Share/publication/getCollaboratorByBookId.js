import { Share } from '../Share.js';

Meteor.publish('getCollaboratorByBookId', function(bookId) {
  check(bookId, String);

  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error('not-allowed', 'Do not have permission');
  }

  // XXX: check more permission here

  return Share.find({
    bookId,
  });
});
