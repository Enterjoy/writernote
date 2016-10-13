import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';
import { FormattedMessage } from 'react-intl';

export class RestoreItemModal extends Component {
  constructor(props) {
    super(props);

    this.restoreItem = this.restoreItem.bind(this);
  }
  restoreItem() {
    const {
      bookId,
      focusRestoreFolder,
      focusRestoreFile,

      hideRestoreModal,

      showError,
      showSuccess,
      intl,
    } = this.props;

    const isFile = !!focusRestoreFile;

    if (isFile) {
      Meteor.call('restoreFile', {
        _id: focusRestoreFile && focusRestoreFile._id,
      }, (err) => {
        if (err) {
          console.error(err);
          showError(
            intl.messages['novelDetail.restoreFail'],
            err.reason
          );
          return;
        }

        showSuccess(intl.messages['novelDetail.restoreSuccess']);
        hideRestoreModal();
        FR.go('NovelDetailPage', {
          bookId,
        }, {
          folderId: focusRestoreFile.folderId,
          fileId: focusRestoreFile._id,
        });
      });
    } else {
      Meteor.call('restoreFolder', {
        _id: focusRestoreFolder && focusRestoreFolder._id,
      }, (err) => {
        if (err) {
          console.error(err);
          showError(
            intl.messages['novelDetail.restoreFail'],
            err.reason
          );
          return;
        }

        showSuccess(intl.messages['novelDetail.restoreSuccess']);
        hideRestoreModal();
        FR.go('NovelDetailPage', {
          bookId,
        }, {
          folderId: focusRestoreFolder._id,
        });
      });
    }


  }
  render() {
    const {
      focusRestoreFolder,
      focusRestoreFile,

      isShowRestoreModal,
      hideRestoreModal,
    } = this.props;

    const isFile = !!focusRestoreFile;

    const canRestore = isFile ?
    !(focusRestoreFile && focusRestoreFile.doesHaveDeletedParent()) :
    !(focusRestoreFolder && focusRestoreFolder.doesHaveDeletedParent());

    return (
      <Modal
        show={isShowRestoreModal}
        onHide={hideRestoreModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="myModalLabel">
              <i className="icon-document-add"></i>
              <FormattedMessage
                id="restoreItem.h4"
                defaultMessage="restoreItem.h4"
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
                      id="restoreItem.fileName"
                      defaultMessage="restoreItem.fileName"
                      values={{val: focusRestoreFile && focusRestoreFile.name}}
                    />
                  </label> :
                  <label>
                    <FormattedMessage
                      id="restoreItem.folderName"
                      defaultMessage="restoreItem.folderName"
                      values={{val: focusRestoreFolder && focusRestoreFolder.name}}
                    />
                  </label>
                }
              </div>
              <div className="form-group">
                {
                  canRestore ?
                  '' :
                  <label className="">
                    <FormattedMessage
                      id="restoreItem.cannot1"
                      defaultMessage="restoreItem.cannot1"
                    />
                    <br />
                    <FormattedMessage
                      id="restoreItem.cannot2"
                      defaultMessage="restoreItem.cannot2"
                    />
                  </label>
                }
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default btn-close"
              onClick={hideRestoreModal}
            >
              <i className="fa fa-times"></i>
              <FormattedMessage
                id="restoreItem.close"
                defaultMessage="restoreItem.close"
              />
            </button>
            {
              canRestore ?
              <button
                className="btn btn-primary btn-confirm"
                onClick={this.restoreItem}
              >
                <i className="fa fa-check"></i>
                <FormattedMessage
                  id="restoreItem.restore"
                  defaultMessage="restoreItem.restore"
                />
              </button> : ''
            }

          </div>

        </div>

      </Modal>
    );
  }
}
