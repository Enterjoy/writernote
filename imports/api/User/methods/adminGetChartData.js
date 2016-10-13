/* global SimpleSchema*/

import moment from 'moment';
import R from 'ramda';
import { User } from '../User.js';
import { Book } from '../../Book/Book.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

export const adminGetChartData = new ValidatedMethod({
  name: 'adminGetChartData',
  mixins: [LoggedInMixin],
  checkLoggedInError: {
    error: 'notLogged',
    reason: 'Do not have permission',
  },
  checkRoles: {
    roles: ['admin'],
    rolesError: {
      error: 'not-allowed',
      reason: 'Do not have permission',
    }
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

    const selector = {
      createdAt: {
        $gte: from,
        $lte: to,
      },
    };

    const userData = User.aggregate([{
      $match: selector,
    }, {
      $project: {
        day: {
          $dateToString: {
            format: '%d/%m',
            date: '$createdAt',
          },
        },
      },
    }, {
      $group: {
        _id: '$day',
        count: {
          $sum: 1,
        }
      }
    }]);

    const bookData = Book.aggregate([{
      $match: selector,
    }, {
      $project: {
        day: {
          $dateToString: {
            format: '%d/%m',
            date: '$createdAt',
          },
        },
      },
    }, {
      $group: {
        _id: '$day',
        count: {
          $sum: 1,
        }
      }
    }]);

    while (mFrom.isSameOrBefore(mTo)) {
      const norm = mFrom.format('DD/MM');
      const user = R.find(R.propEq('_id', norm), userData);
      const book = R.find(R.propEq('_id', norm), bookData);

      re.push({
        users: user && user.count || 0,
        books: book && book.count || 0,
        name: norm,
      });

      mFrom.add(1, 'days');
    }

    return re;
  }
});
