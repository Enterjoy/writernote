import { Label } from '../Label.js';

Meteor.publish('getLabelByBookId', function(bookId) {
  check(bookId, String);

  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error(403, 'Do not have permission');
  }

  // XXX: check more permission here

  return Label.find({
    bookId,
  });
});
