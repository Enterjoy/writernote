import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export class UserItem extends Component {
  constructor(props) {
    super(props);

    this.block = this.block.bind(this);
    this.unblock = this.unblock.bind(this);
  }
  block() {
    const {
      _id,

      showError,
      showSuccess,
      intl,
    } = this.props;

    Meteor.call('blockUser', {
      _id,
    }, (err) => {
      if (err) {
        console.error(err);
        showError(
          intl.messages['admin.blockFailed'],
          err.reason
        );
        return;
      }

      showSuccess(intl.messages['admin.blockSuccess']);
    });
  }
  unblock() {
    const {
      _id,

      showError,
      showSuccess,
      intl,
    } = this.props;

    Meteor.call('unblockUser', {
      _id,
    }, (err) => {
      if (err) {
        console.error(err);
        showError(
          intl.messages['admin.unblockFailed'],
          err.reason
        );
        return;
      }

      showSuccess(intl.messages['admin.unblockSuccess']);
    });
  }
  render() {
    const {
      emails,
      isBlock,
    } = this.props;

    return (
      <tr>
        <td>
          <span>{emails && emails[0] && emails[0].address}</span>
        </td>
        <td>
        {
          isBlock ?
          <button
            onClick={this.unblock}
            className="btn btn-primary"
          >
            <FormattedMessage
              id="admin.unblock"
              defaultMessage="admin.unblock"
            />
          </button> :
          <button
            onClick={this.block}
            className="btn btn-primary"
          >
            <FormattedMessage
              id="admin.block"
              defaultMessage="admin.block"
            />
          </button>
        }
        </td>
      </tr>
    );
  }
}
