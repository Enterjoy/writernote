import React, { Component } from 'react';
import { UserItem } from './UserItem/UserItem.jsx';
import { FormattedMessage } from 'react-intl';

export class UserManagement extends Component {
  render() {
    const {
      users,
      searchName,
      changeSearchName,

      intl,
    } = this.props;

    return (
      <div className="user-account-block">
        <div className="container">
          <h2 className="title">
            <FormattedMessage
              id="admin.userManagement"
              defaultMessage="admin.userManagement"
            />
          </h2>
          <div className="search-block">
            <div className="form-group">
              <i className="icon-search"></i>
              <input
                className="form-control"
                placeholder={intl.messages['admin.searchEmail']}
                value={searchName}
                onChange={changeSearchName}
              />
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <th>
                <FormattedMessage
                  id="admin.email"
                  defaultMessage="admin.email"
                />
              </th>
              <th>
                <FormattedMessage
                  id="admin.action"
                  defaultMessage="admin.action"
                />
              </th>
            </thead>
            <tbody>
              {
                users.map(obj => <UserItem key={obj._id} {...this.props} {...obj} />)
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
