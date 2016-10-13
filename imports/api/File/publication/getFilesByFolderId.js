import { File } from '../File.js';

Meteor.publish('getFilesByFolderId', function(folderId) {
  check(folderId, [String]);

  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error(403, 'Do not have permisson');
  }

  // XXX: check other permission here

  return File.find({
    folderId: {
      $in: folderId,
    },
  });
});
