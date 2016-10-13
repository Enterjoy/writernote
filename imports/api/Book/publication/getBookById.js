import { Book } from '../Book.js';

Meteor.publish('getBookById', function(bookId) {
  check(bookId, String);

  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error('not-allowd', 'Do not have permission');
  }

  const book = Book.findOne(bookId);

  if (!book) {
    throw new Meteor.Error('error', 'Book do not exist');
  }

  if (!book.isSharedWith(userId)) {
    throw new Meteor.Error('not-allowd', 'Do not have permission');
  }

  // XXX: check permission here

  return Book.find({
    _id: bookId,
    isDeleted: false,
  });
});
