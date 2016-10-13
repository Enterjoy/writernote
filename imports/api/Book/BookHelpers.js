import { Book } from './Book.js';
import { Share } from '../Share/Share.js';

Book.helpers({
  isSharedWith(userId) {
    return !!Share.findOne({
      userId,
      bookId: this._id,
    });
  },
});
