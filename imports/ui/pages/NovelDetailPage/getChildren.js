import { Folder } from '../../../api/Folder/Folder.js';
import { File } from '../../../api/File/File.js';

import R from 'ramda';

export const getChildren = function getChildren(
  bookId,
  folderId,
  fileId,
  isDelete,
  folder
) {
  const cfolder = Folder.find({
    bookId,
    parentId: folder._id,
    isDelete,
  }, {
    sort: {
      index: 1,
    }
  }).map(f => {
    let isActive = false;
    let isFocus = false;

    if (folderId === f._id) {
      isActive = true;
      if (!fileId) {
        isFocus = true;
      }
    }

    const c = getChildren(bookId, folderId, fileId, isDelete, f);

    return {
      type: 'folder',
      ...c,
      isActive: isActive || c.isActive,
      isFocus,
    };
  });

  const cfile = File.find({
    folderId: folder._id,
    isDelete,
  }, {
    sort: {
      index: 1,
    }
  }).map(f => {
    let isActive = false;
    let isFocus = false;

    if (fileId === f._id) {
      isActive = true;
      isFocus = true;
    }

    return {
      type: 'file',
      isActive,
      isFocus,
      ...f,
    };
  });

  const children = [...cfolder, ...cfile];

  const isActive = !!R.find(R.propEq('isActive', true), children) ||
  folderId === folder._id;

  return {
    children,
    isActive,
    ...folder,
  };
};
