import { Modal } from 'react-bootstrap';

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export class DeleteItemModal extends Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem() {
    const {
      focusFolder,
      focusFile,

      intl,
      showError,
      showSuccess,
      hideDeleteItemModal,
    } = this.props;

    const isFile = !!focusFile;

    if (isFile) {
      Meteor.call('deleteFile', {
        _id: focusFile && focusFile._id,
      }, (err) => {
        if (err) {
          console.error(err);
          showError(
            intl.messages['novelDetail.deleteFailed'],
            err.reason
          );
          return;
        }

        showSuccess(intl.messages['novelDetail.deleteSuccess']);
        hideDeleteItemModal();
      });
    } else {
      Meteor.call('deleteFolder', {
        _id: focusFolder && focusFolder._id,
      }, (err) => {
        if (err) {
          console.error(err);
          showError(
            intl.messages['novelDetail.deleteFailed'],
            err.reason
          );
          return;
        }

        showSuccess(intl.messages['novelDetail.deleteSuccess']);
        hideDeleteItemModal();
      });
    }

  }

  render() {
    const {
      isShowDeleteItemModal,
      hideDeleteItemModal,

      focusFolder,
      focusFile,
    } = this.props;

    const isFile = !!focusFile;

    return (
      <Modal
        show={isShowDeleteItemModal}
        onHide={hideDeleteItemModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="icon-document-add"></i>
              <FormattedMessage
                id="novelDetail.deleteItem"
                defaultMessage="novelDetail.deleteItem"
              />
            </h4>
          </div>
          <div className="modal-body">
            <div className="create-new-item-content">
              <div className="form-group">
              {
                isFile ?
                <label>
                  <FormattedMessage
                    id="novelDetail.fileName"
                    defaultMessage="novelDetail.fileName"
                  />:
                  {focusFile && focusFile.name}
                </label> :
                <label>
                  <FormattedMessage
                    id="novelDetail.folderName"
                    defaultMessage="novelDetail.folderName"
                  />:
                  {focusFolder && focusFolder.name}
                </label>
              }
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default btn-close"
              onClick={hideDeleteItemModal}
            >
              <i className="fa fa-times"></i>
              <FormattedMessage
                id="novelDetail.close"
                defaultMessage="novelDetail.close"
              />
            </button>
            <button
              className="btn btn-primary btn-confirm"
              onClick={this.deleteItem}
            >
              <i className="fa fa-check"></i>
              <FormattedMessage
                id="novelDetail.delete"
                defaultMessage="novelDetail.delete"
              />
            </button>
          </div>

        </div>
      </Modal>
    );
  }
}
