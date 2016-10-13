import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export class ShareItem extends Component {
  constructor(props) {
    super(props);

    this.removeCollaborator = this.removeCollaborator.bind(this);
  }
  removeCollaborator() {
    const {
      showError,
      showSuccess,

      intl,

      collaborator,
      removeNewCollaborator,
    } = this.props;

    if (collaborator.isNew) {
      removeNewCollaborator();
    } else {
      Meteor.call('removeCollaborator', {
        _id: collaborator._id,
      }, (err) => {
        if (err) {
          showError(
            intl.messages['novelDetail.removeCollaboratorFail'],
            err.reason
          );
          return;
        }
        showSuccess(intl.messages['novelDetail.removeCollaboratorSuccess']);
      });
    }

  }
  render() {
    const {
      collaborator: col,
      changeEmail,
      changeRole,
    } = this.props;
    return (
      <tr>
        <td>
        {
          col.isNew ?
          <input
            type="email"
            className="form-control"
            value={col.email}
            name=""
            onChange={changeEmail.bind(undefined, col)}
          /> :
          <span>{col && col.user && col.user.email()}</span>
        }
        </td>
        <td>
          <select
            className="form-control select-permission"
            value={col && col.role}
            disabled={col && col.role === 'owner'}
            onChange={changeRole.bind(undefined, col)}
          >
            <option disabled value="owner">
              <FormattedMessage
                id="shareItem.owner"
                defaultMessage="shareItem.owner"
              />
            </option>
            <option value="editor">
              <FormattedMessage
                id="shareItem.editor"
                defaultMessage="shareItem.editor"
              />
            </option>
            <option value="viewer">
              <FormattedMessage
                id="shareItem.viewer"
                defaultMessage="shareItem.viewer"
              />
            </option>
          </select>
        </td>
        <td>
        {
          col && col.role !== 'owner' ?
          <button
            className="btn btn-danger"
            onClick={this.removeCollaborator}
          >
            <FormattedMessage
              id="shareItem.delete"
              defaultMessage="shareItem.delete"
            />
          </button> : ''
        }
        </td>
      </tr>
    );
  }
}
