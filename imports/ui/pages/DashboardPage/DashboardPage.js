import { createContainer } from 'meteor/react-meteor-data';
import { SubsManager } from 'meteor/meteorhacks:subs-manager';

import { Book } from '../../../api/Book/Book.js';
import { Folder } from '../../../api/Folder/Folder.js';

import { DashboardPage } from '../../components/DashboardPage/DashboardPage.jsx';

const sub1 = new SubsManager();

const dict = new ReactiveDict('DashboardPage');

dict.setDefault({
  isShowCreateModal: false,
  isShowDeleteModal: false,
  focusDeleteId: '',
});

export default createContainer(() => {
  const user = Meteor.user();

  Meteor.subscribe('getBookByUserId');

  const books = Book.find({
    ownerId: Meteor.userId(),
    isDeleted: false,
  }, {
    sort: {
      modifiedAt: -1,
      createdAt: -1,
    }
  }).map(obj => {
    const f = Folder.findOne({
      bookId: obj._id,
    });

    return {
      folderId: f && f._id,
      ...obj,
    };
  });

  return {
    user,
    books,

    isShowCreateModal: dict.get('isShowCreateModal'),
    isShowDeleteModal: dict.get('isShowDeleteModal'),
    focusDeleteId: dict.get('focusDeleteId'),

    showCreateModal() {
      dict.set('isShowCreateModal', true);
    },
    hideCreateModal() {
      dict.set('isShowCreateModal', false);
    },

    showDeleteModal() {
      dict.set('isShowDeleteModal', true);
    },
    hideDeleteModal() {
      dict.set('isShowDeleteModal', false);
    },

    setFocusDeleteId(id) {
      dict.set('focusDeleteId', id);
    },
  };
}, DashboardPage);
