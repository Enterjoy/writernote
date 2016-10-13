import { Folder } from './Folder.js';
import { File } from '../File/File.js';
import R from 'ramda';

const getDescendant = function getDescendant(f) {
  return [
    f,
    ...Folder.find({
      parentId: f._id,
    }).map(getDescendant),
  ];
};

Folder.helpers({
  getFolderDescendant() {
    return R.flatten(R.remove(0, 1, getDescendant(this)));
  },
  getFileDescendant() {
    const f = this.getFolderDescendant();

    return R.flatten(f.map((obj) => {
      return File.find({
        folderId: obj._id,
      }).fetch();
    }));
  },
  getAllDescendant() {
    return {
      folder: this.getFolderDescendant(),
      file: this.getFileDescendant(),
    };
  },
  doesHaveDeletedParent() {
    return !!Folder.findOne({
      _id: this.parentId,
      isDelete: true,
    });
  },
  getLevel() {
    let count = -1;
    let id = this._id;

    while (Folder.findOne(id)) {
      count++;
      id = Folder.findOne(id).parentId;
    }

    return count;
  },
  doesHaveChildren() {
    return Folder.find({
      bookId: this.bookId,
      parentId: this._id,
    }).count > 0 ||
    File.find({
      folderId: this._id,
    }).count() > 0;
  },
  getFolderChildrenCount() {
    return Folder.find({
      parentId: this._id,
      isDelete: false,
    }, {
      sort: {
        index: 1,
      }
    }).map((obj, index) => ({
      value: obj.index,
      name: index + 1,
    }));
  },
  getFileChildrenCount() {
    return File.find({
      folderId: this._id,
      isDelete: false,
    }, {
      sort: {
        index: 1,
      }
    }).map((obj, index) => ({
      value: obj.index,
      name: index + 1,
    }));
  },
  getPossibleParent() {
    const doesHaveChildren = this.doesHaveChildren();

    return Folder.find({
      _id: {
        $ne: this._id,
      },
      folderType: {
        $in: ['normal', 'root'],
      },
      bookId: this.bookId,
      isDelete: false,
    }).fetch().filter(obj => {
      if (doesHaveChildren) {
        return obj.getLevel() < 1;
      }
      return obj.getLevel() < 2;
    }).map(obj => {
      return {
        ...obj,
        childrenCount: obj.getFolderChildrenCount(),
      };
    });
  }
});
