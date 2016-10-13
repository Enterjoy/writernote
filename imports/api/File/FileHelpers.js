import { File } from './File.js';

import { Folder } from '../Folder/Folder.js';

File.helpers({
  doesHaveDeletedParent() {
    return !!Folder.findOne({
      _id: this.folderId,
      isDelete: true,
    });
  },
  getLevel() {
    let count = 0;

    let parent = Folder.findOne(this.folderId);

    while (parent) {
      count++;
      parent = Folder.findOne(parent.parentId);
    }

    return count;
  },
  getPossibleParent() {
    const parent = Folder.findOne(this.folderId);
    return Folder.find({
      bookId: parent && parent.bookId,
      folderType: {
        $in: ['normal', 'root'],
      },
    }).fetch().filter(obj => {
      return obj.getLevel() < 2;
    }).map(obj => {
      return {
        ...obj,
        childrenCount: obj.getFileChildrenCount(),
      };
    });
  }

});
