/* global SimpleSchema*/

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

import { Share } from '../Share.js';
// import { FlowRouter as FR } from 'meteor/kadira:flow-router';

export const removeCollaborator = new ValidatedMethod({
  name: 'removeCollaborator',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    _id: {
      type: String,
    },
  }).validator(),
  run({_id}) {
    // XXX: check more permission here
    return Share.remove(_id);
  },
});
