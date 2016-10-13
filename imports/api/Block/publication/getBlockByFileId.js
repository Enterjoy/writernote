import { Block } from '../Block.js';

Meteor.publish('getBlockByFileId', function(fileId) {
  check(fileId, String);

  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error(403, 'Do not have permission');
  }

  // XXX: check permission here
  // XXX: will have to limit later

  return Block.find({
    fileId,
  }, {
    sort: {
      index: 1,
    },
  });
});
