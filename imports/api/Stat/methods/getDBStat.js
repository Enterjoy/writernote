/* global SimpleSchema*/

import { Stat } from '../Stat.js';
import moment from 'moment';
import R from 'ramda';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const getDBStat = new ValidatedMethod({
  name: 'getDBStat',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  validate: new SimpleSchema({
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
  }).validator(),
  run({from, to}) {
    const mFrom = moment(from);
    const mTo = moment(to);
    const re = [];

    const userId = Meteor.userId();
    const selector = {
      userId,
      day: {
        $gte: from,
        $lte: to,
      },
    };

    const data = Stat.aggregate([{
      $match: selector,
    }, {
      $project: {
        name: '$day',
        words: 1,
        characters: 1,
      },
    }]).map(obj => ({
      ...obj,
      name: moment(obj.name).format('DD/MM'),
    }));

    while (mFrom.isSameOrBefore(mTo)) {
      const norm = mFrom.format('DD/MM');
      const obj = R.find(R.propEq('name', norm), data);

      re.push({
        words: obj && obj.words || 0,
        characters: obj && obj.characters || 0,
        name: norm,
      });

      mFrom.add(1, 'days');
    }

    return re;
  }
});
