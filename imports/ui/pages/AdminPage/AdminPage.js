import { createContainer } from 'meteor/react-meteor-data';
import { SubsManager } from 'meteor/meteorhacks:subs-manager';

import { AdminPage } from '../../components/AdminPage/AdminPage.jsx';
import { User } from '../../../api/User/User.js';

const dict = new ReactiveDict('AdminPage');

const sub1 = new SubsManager();

dict.setDefault({
  searchName: '',
});

export default createContainer(() => {
  sub1.subscribe('getAllUsers');

  const users = User.find({
    'emails.address': new RegExp(dict.get('searchName'), 'gi'),
    roles: {
      $ne: 'admin',
    },
  }).fetch();

  return {
    users,

    changeSearchName(e) {
      dict.set('searchName', e.target.value);
    }
  };
}, AdminPage);
