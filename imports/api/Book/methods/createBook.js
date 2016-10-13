/* global SimpleSchema*/

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { Book } from '../Book.js';
import { Folder } from '../../Folder/Folder.js';
import { Share } from '../../Share/Share.js';

export const createBook = new ValidatedMethod({
  name: 'createBook',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: Book.simpleSchema().omit([
    'ownerId',
    'createdAt',
    'modifiedAt',
    'isDeleted',
  ]).validator(),
  run(data) {
    const userId = Meteor.userId();
    const now = new Date();

    const bookId = Book.insert({
      ...data,
      ownerId: userId,
      createdAt: now,
      modifiedAt: now,
    });

    Share.insert({
      userId,
      bookId,
      role: 'owner',
    });

    // XXX: should use bulk insert here

    Folder.insert({
      name: 'Draft',
      index: 0,
      bookId,
      folderType: 'root',
    });

    // Folder.insert({
    //   name: 'Research',
    //   index: 1,
    //   bookId,
    //   folderType: 'research',
    // });

    Folder.insert({
      name: 'Trash',
      index: 2,
      bookId,
      folderType: 'trash',
    });

    Folder.insert({
      name: 'Template',
      index: 3,
      bookId,
      folderType: 'template',
    });

    Folder.insert({
      name: 'Settings',
      index: 4,
      bookId,
      folderType: 'settings',
    });

    return bookId;
  },
});
