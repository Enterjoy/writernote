import { createContainer } from 'meteor/react-meteor-data';
import { SubsManager } from 'meteor/meteorhacks:subs-manager';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';

import { NovelDetailPage } from '../../components/NovelDetailPage/NovelDetailPage.jsx';

import { Book } from '../../../api/Book/Book.js';
import { Folder } from '../../../api/Folder/Folder.js';
import { File } from '../../../api/File/File.js';
import { Label } from '../../../api/Label/Label.js';
import { Share } from '../../../api/Share/Share.js';
import { User } from '../../../api/User/User.js';

import { getChildren } from './getChildren.js';

import R from 'ramda';

const sub1 = new SubsManager();

const dict = new ReactiveDict('NovelDetailPage');

dict.setDefault({
  isShowLeftSidebar: true,
  isShowRightSidebar: true,
  isShowCreateItemModal: false,
  isShowDeleteItemModal: false,
  isShowEditItemModal: false,
  isShowRestoreModal: false,
  focusRestoreFolder: null,
  focusRestoreFile: null,
});

export default createContainer((props) => {
  const {
    bookId,
    folderId,
    fileId,
  } = props;

  const folderIds = Folder.find({
    bookId,
  }, {
    sort: {
      index: 1,
    }
  }).map(obj => obj._id);

  const uids = Share.find({
    bookId,
  }).map(obj => obj.userId);

  sub1.subscribe('getBookById', bookId);
  sub1.subscribe('getLabelByBookId', bookId);
  sub1.subscribe('getFoldersByBookId', bookId);
  sub1.subscribe('getCollaboratorByBookId', bookId);
  sub1.subscribe('getFilesByFolderId', folderIds);
  sub1.subscribe('getUsersInfo', uids);

  const collaborators = Share.find({
    bookId,
  }).map(obj => {
    return {
      ...obj,
      user: User.findOne(obj.userId),
    };
  });


  const book = Book.findOne(bookId);

  if (!folderId) {
    const f = Folder.findOne({
      bookId,
    }, {
      sort: {
        index: 1,
      }
    });

    f && FR.go('NovelDetailPage', {
      bookId,
    }, {
      folderId: f._id,
    });
  }

  const focusFolder = Folder.findOne(folderId);

  const focusFolderLevel = focusFolder && focusFolder.getLevel();

  const focusFolderChildren = Folder.find({
    parentId: folderId,
    isDelete: false,
  }, {
    sort: {
      index: 1,
    }
  }).map(obj => ({
    type: 'folder',
    ...obj,
  }));

  const focusFileChilren = File.find({
    folderId,
    isDelete: false,
  }, {
    sort: {
      index: 1
    }
  }).map(obj => ({
    type: 'file',
    ...obj,
  }));

  const focusFile = File.findOne(fileId);

  const focusFileLevel = focusFile && focusFile.getLevel();

  const folders = Folder.find({
    bookId,
    parentId: {
      $exists: false,
    }
  }, {
    sort: {
      index: 1,
    }
  }).map(getChildren.bind(undefined, bookId, folderId, fileId, false))
  .map(f => {
    return {
      ...f,
      isFocus: f._id === folderId && !focusFile,
    };
  });

  const rootFolder = Folder.findOne({
    bookId,
    folderType: 'root',
  });

  const includedFolders = Folder.find({
    bookId,
    parentId: rootFolder && rootFolder._id,
    isDelete: false,
    folderType: 'normal',
  }, {
    sort: {
      index: 1,
    },
  }).map(obj => ({
    _id: obj._id,
    name: obj.name,
  }));

  const deletedFolder = Folder.find({
    isDelete: true,
    bookId,
  }).fetch()
  .filter(obj => !obj.doesHaveDeletedParent())
  .map(obj => ({
    type: 'folder',
    ...obj,
  }))
  .map(getChildren.bind(undefined, bookId, folderId, fileId, true));

  const deletedFile = File.find({
    isDelete: true,
  }).fetch()
  .filter(obj => !obj.doesHaveDeletedParent());

  const possibleParent = focusFile ?
  focusFile.getPossibleParent() :
  focusFolder && focusFolder.getPossibleParent() || [];

  const templateFolder = Folder.findOne({
    bookId,
    folderType: 'template',
  });

  const templateFiles = File.find({
    folderId: templateFolder && templateFolder._id,
    isDelete: false,
  }).fetch();

  const settingFiles = File.find({
    isDelete: false,
    fileType: 'settings',
  }).fetch();

  return {
    collaborators,
    book,
    folders: folders.map(obj => {
      if (obj.folderType === 'trash') {
        return {
          ...obj,
          children: [...deletedFolder, ...deletedFile],
        };
      }
      return obj;
    }),

    includedFolders,
    templateFiles,
    settingFiles,

    labels: R.uniq([
      'label1',
      'label2',
      'label2',
      ...Label.find({
        bookId,
      }).map(obj => obj.name)
    ]),

    isFile: !!folderId && !!fileId,

    focusFolder: {
      ...focusFolder,
      children: [...focusFolderChildren, ...focusFileChilren],
    },

    focusFile,

    possibleParent,

    focusLevel: focusFileLevel || focusFolderLevel,

    focusRestoreFolder: Folder.findOne(dict.get('focusRestoreFolder')),
    focusRestoreFile: File.findOne(dict.get('focusRestoreFile')),

    isShowLeftSidebar: dict.get('isShowLeftSidebar'),
    isShowRightSidebar: dict.get('isShowRightSidebar'),
    isShowCreateItemModal: dict.get('isShowCreateItemModal'),
    isShowDeleteItemModal: dict.get('isShowDeleteItemModal'),
    isShowRestoreModal: dict.get('isShowRestoreModal'),
    isShowEditItemModal: dict.get('isShowEditItemModal'),

    toggleLeftSidebar() {
      dict.set(
        'isShowLeftSidebar',
        !dict.get('isShowLeftSidebar')
      );
    },

    toggleRightSidebar() {
      dict.set(
        'isShowRightSidebar',
        !dict.get('isShowRightSidebar')
      );
    },

    showEditItemModal() {
      dict.set('isShowEditItemModal', true);
    },

    hideEditItemModal() {
      dict.set('isShowEditItemModal', false);
    },

    showCreateItemModal() {
      dict.set('isShowCreateItemModal', true);
    },

    hideCreateItemModal() {
      dict.set('isShowCreateItemModal', false);
    },

    showDeleteItemModal() {
      dict.set('isShowDeleteItemModal', true);
    },

    hideDeleteItemModal() {
      dict.set('isShowDeleteItemModal', false);
    },

    showRestoreModal() {
      dict.set('isShowRestoreModal', true);
    },

    hideRestoreModal() {
      dict.set('isShowRestoreModal', false);
    },

    setFocusRestoreFolder(_id) {
      dict.set('focusRestoreFolder', _id);
    },

    setFocusRestoreFile(_id) {
      dict.set('focusRestoreFile', _id);
    },

  };
}, NovelDetailPage);
