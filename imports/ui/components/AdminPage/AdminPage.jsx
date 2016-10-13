import React, { Component } from 'react';
import '../../../stylesheets/AdminPage.scss';

import { Stat } from './Stat/Stat.jsx';
import { UserManagement } from './UserManagement/UserManagement.jsx';

export class AdminPage extends Component {
  render() {
    return (
      <div className="admin-page dashboard-page page">
        <Stat {...this.props} />
        <UserManagement {...this.props} />
      </div>
    );
  }
}
