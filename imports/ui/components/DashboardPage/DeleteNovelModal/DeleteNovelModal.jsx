import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Book } from '../../../../api/Book/Book.js';

export class DeleteNovelModal extends Component {
  constructor(props) {
    super(props);

    this.deleteBook = this.deleteBook.bind(this);

  }

  deleteBook() {
    const {
      focusDeleteId,

      showError,
      showSuccess,
      intl,
      hideDeleteModal,
      setFocusDeleteId,
    } = this.props;

    Meteor.call('deleteBook', {
      _id: focusDeleteId,
    }, (err) => {
      if (err) {
        showError(
          intl.messages['dashboard.deleteFailed'],
          err.reason
        );
        return;
      }

      showSuccess(intl.messages['dashboard.deleteSuccess']);
      hideDeleteModal();
      setFocusDeleteId('');
    });
  }

  render() {
    const {
      isShowDeleteModal,
      hideDeleteModal,
      focusDeleteId,
    } = this.props;

    const book = Book.findOne(focusDeleteId);

    return (
      <Modal
        show={isShowDeleteModal}
        onHide={hideDeleteModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="icon-document-add"></i>
              <FormattedMessage
                id="dashboard.deleteNovel"
                defaultMessage="dashboard.deleteNovel"
              />
            </h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="novelName">
                <FormattedMessage
                  id="dashboard.confirmMessage"
                  defaultMessage="dashboard.confirmMessage"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="novelName">
                {book && book.name}
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-default btn-close"
              onClick={hideDeleteModal}
            >
              <i className="fa fa-times"></i>
              <FormattedMessage
                id="dashboard.close"
                defaultMessage="dashboard.close"
              />
            </button>
            <button
              className="btn btn-primary btn-confirm"
              onClick={this.deleteBook}
            >
              <i className="fa fa-check"></i>
              <FormattedMessage
                id="dashboard.confirm"
                defaultMessage="dashboard.confirm"
              />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
