import { Book } from '../Book.js';
import { Folder } from '../../Folder/Folder.js';

Meteor.publishComposite('getBookByUserId', function() {
  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error(403, 'Do not have permission');
  }

  return {
    find() {

      // XXX: will have to limit later
      return Book.find({
        ownerId: userId,
        isDeleted: false,
      }, {
        sort: {
          modifiedAt: -1,
          createdAt: -1,
        }
      });
    },
    children: [
      {
        find(book) {
          return Folder.find({
            bookId: book._id,
          }, {
            sort: {
              index: 1,
            },
            limit: 1,
          });
        }
      }
    ]
  };
});
