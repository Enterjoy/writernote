import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Slingshot as SS } from 'meteor/edgee:slingshot';

export class CreateNovelModal extends Component {
  constructor(props) {
    super(props);

    this.submitNewNovel = this.submitNewNovel.bind(this);
    this.fileChange = this.fileChange.bind(this);

    this.state = {
      img: undefined,
      isUploading: false,
      fileInput: null,
    };

  }
  fileChange(e) {
    e.persist();
    const {
      showError,
      intl,
    } = this.props;

    this.setState({
      isUploading: true,
      fileInput: e.target.value,
    });

    const image = e.target.files[0];

    let uploader;

    try {
      uploader = new SS.Upload('imageUpload');
    } catch (err) {
      console.error(err);
      uploader = undefined;
      this.refs.form.reset();
      showError(
        intl.messages['createNovelModal.uploadFailTitle'],
        intl.messages['createNovelModal.uploadFailMessage'],
      );
    }

    uploader && uploader.send(image, (error, downloadUrl) => {
      if (error) {
        console.error('Error uploading', uploader.xhr.response);
        this.refs.form.reset();

        this.setState({
          isUploading: false,
          fileInput: null,
        });

        showError(
          intl.messages['createNovelModal.uploadFailTitle'],
          intl.messages['createNovelModal.uploadFailMessage'],
        );
        return;
      }

      this.setState({
        img: downloadUrl,
        isUploading: false,
      });
    });
  }
  submitNewNovel(e) {
    e.preventDefault();

    const target = e.target;

    const name = target.name.value.trim();

    const {
      showError,
      showSuccess,
      hideCreateModal,

      intl,
    } = this.props;

    const {
      img,
      // isUploading,
    } = this.state;

    Meteor.call('createBook', {
      name,
      img,
    }, (err) => {
      this.setState({
        img: undefined,
        fileInput: null,
      });

      if (err) {
        showError(
          intl.messages['dashboard.createFailed'],
          err.reason
        );
        return;
      }
      showSuccess(intl.messages['dashboard.createSuccess']);
      hideCreateModal();
    });
  }
  render() {
    const {
      isShowCreateModal,
      hideCreateModal,
    } = this.props;

    return (
      <Modal
        show={isShowCreateModal}
        onHide={hideCreateModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="icon-document-add"></i>
              <FormattedMessage
                id="dashboard.createNovel"
                defaultMessage="dashboard.createNovel"
              />
            </h4>
          </div>
          <form ref="form" onSubmit={this.submitNewNovel}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="novelName">
                  <FormattedMessage
                    id="dashboard.novelName"
                    defaultMessage="dashboard.novelName"
                  />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="novelImage">
                  <FormattedMessage
                    id="createNovelModal.novelImage"
                    defaultMessage="createNovelModal.novelImage"
                  />
                </label>
                <input
                  value={this.state.fileInput}
                  name="image"
                  type="file"
                  className="form-control"
                  accept="image/gif, image/jpeg, image/png"
                  onChange={this.fileChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-default btn-close"
                onClick={hideCreateModal}
                type="reset"
              >
                <i className="fa fa-times"></i>
                <FormattedMessage
                  id="dashboard.close"
                  defaultMessage="dashboard.close"
                />
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-confirm"
                disabled={this.state.isUploading}
              >
                <i className="fa fa-check"></i>
                <FormattedMessage
                  id="dashboard.confirm"
                  defaultMessage="dashboard.confirm"
                />
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}
