import { Folder } from '../Folder.js';
import { Book } from '../../Book/Book.js';

Meteor.publish('getFoldersByBookId', function(bookId) {
  check(bookId, String);

  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error(403, 'Do not have permisson');
  }

  const book = Book.findOne(bookId);

  if (!book) {
    throw new Meteor.Error('error', 'Book do not exist');
  }

  if (!book.isSharedWith(userId)) {
    throw new Meteor.Error('not-allowd', 'Do not have permission');
  }

  // XXX: check other permisosn here

  return Folder.find({
    bookId,
  });
});
