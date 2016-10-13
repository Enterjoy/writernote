import { Modal } from 'react-bootstrap';

import React, { Component } from 'react';
import { ShareItem } from './ShareItem/ShareItem.jsx';
import { FormattedMessage } from 'react-intl';

import R from 'ramda';

import { Random } from 'meteor/random';


export class ShareModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaborators: [],
    };

    this.addCollaborator = this.addCollaborator.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.confirm = this.confirm.bind(this);
    this.removeNewCollaborator = this.removeNewCollaborator.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({
      collaborators: R.clone(props.collaborators),
    });
  }
  confirm() {
    const {
      collaborators: cols,
    } = this.state;

    const {
      showError,
      showSuccess,

      intl,

      bookId,
    } = this.props;


    const re = cols
    .filter(obj => obj.isNew || obj.isUpdate)
    .map(obj => {
      if (obj.isNew) {
        return {
          _id: obj._id,
          email: obj.email,
          role: obj.role,
          type: 'new',
        };
      }

      return {
        _id: obj._id,
        email: obj && obj.user && obj.user.email(),
        role: obj.role,
        type: 'update',
      };
    });

    Meteor.call('processCollaborators', {
      collaborators: re,
      bookId,
    }, (err) => {
      if (err) {
        showError(
          intl.messages['novelDetail.updateFail'],
          err.reason
        );
        return;
      }
      showSuccess(intl.messages['novelDetail.updateSuccess']);
    });
  }
  removeNewCollaborator() {
    const {
      collaborators,
    } = this.state;

    this.setState({
      collaborators: collaborators.filter(obj => !obj.isNew),
    });
  }
  addCollaborator() {
    const {
      collaborators,
    } = this.state;

    const last = R.last(collaborators);

    if (!last.isNew) {
      collaborators.push({
        _id: Random.id(),
        isNew: true,
        email: '',
        role: 'editor',
      });

      this.setState({
        collaborators,
      });
    }
  }
  changeEmail(col, e) {
    const {
      collaborators,
    } = this.state;

    const re = collaborators.map(obj => {
      if (obj._id === col._id) {
        return {
          ...obj,
          email: e.target.value.trim(),
        };
      }

      return {
        ...obj,
      };
    });

    this.setState({
      collaborators: re,
    });
  }
  changeRole(col, e) {
    const {
      collaborators,
    } = this.state;

    const re = collaborators.map(obj => {
      if (obj._id === col._id) {
        return {
          ...obj,
          role: e.target.value.trim(),
          isUpdate: true,
        };
      }

      return {
        ...obj,
      };
    });

    this.setState({
      collaborators: re,
    });
  }
  render() {
    const {
      isShowShareModal,
      hideShareModal,
    } = this.props;

    const {
      collaborators,
    } = this.state;

    return (
      <Modal
        show={isShowShareModal}
        onHide={hideShareModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="fa fa-share-alt"></i>
              <FormattedMessage
                id="shareModal.h4"
                defaultMessage="shareModal.h4"
              />
            </h4>
          </div>
          <div className="modal-body">
            <table className="table table-striped">
              <thead>
                <th>
                  <FormattedMessage
                    id="shareModal.email"
                    defaultMessage="shareModal.email"
                  />
                </th>
                <th>
                  <FormattedMessage
                    id="shareModal.role"
                    defaultMessage="shareModal.role"
                  />
                </th>
                <th>
                  <FormattedMessage
                    id="shareModal.action"
                    defaultMessage="shareModal.action"
                  />
                </th>
              </thead>
              <tbody>
              {
                collaborators.map(obj => {
                  return (<ShareItem
                    {...this.props}
                    key={obj._id}
                    collaborator={obj}
                    changeEmail={this.changeEmail}
                    changeRole={this.changeRole}
                    removeNewCollaborator={this.removeNewCollaborator}
                  />);
                })
              }
              </tbody>
            </table>
            <div className="">
              <button
                className="btn btn-primary"
                onClick={this.addCollaborator}
              >
                <FormattedMessage
                  id="shareModal.add"
                  defaultMessage="shareModal.add"
                />
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default btn-close"
              onClick={hideShareModal}
            >
              <i className="fa fa-times"></i>
              <FormattedMessage
                id="shareModal.close"
                defaultMessage="shareModal.close"
              />
            </button>
            <button
              className="btn btn-primary btn-confirm"
              onClick={this.confirm}
            >
              <i className="fa fa-check"></i>
              <FormattedMessage
                id="shareModal.confirm"
                defaultMessage="shareModal.confirm"
              />
            </button>
          </div>
        </div>
      </Modal>

    );
  }
}
