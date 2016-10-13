import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export class CreateItemModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      templateId: '',
      isShowTemplate: false,
      type: 'folder',
    };

    this.createItem = this.createItem.bind(this);
    this.templateChange = this.templateChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
  }

  componentWillReceiveProps(props) {
    const {
      focusFolder,
    } = props;

    if (focusFolder &&
      (focusFolder.folderType === 'template' ||
      focusFolder.folderType === 'settings')
    ) {
      this.setState({
        type: 'file',
        isShowTemplate: true,
      });
    } else {
      this.setState({
        type: 'folder',
        isShowTemplate: false,
      });
    }
  }

  typeChange(e) {
    const val = e.target.value;

    if (val === 'file') {
      this.setState({
        type: val,
        isShowTemplate: true,
      });
      return;
    }

    this.setState({
      type: val,
      isShowTemplate: false,
    });
  }
  templateChange(e) {
    this.setState({
      templateId: e.target.value,
    });
  }
  createItem(e) {
    e.preventDefault();
    const target = e.target;

    const {
      focusFolder,
      bookId,

      showError,
      showSuccess,
      intl,
      hideCreateItemModal,
    } = this.props;

    const name = target.name.value.trim();
    const type = target.type.value.trim();
    let template = target.template.value.trim();

    template = template.length > 0 ? template : undefined;

    if (type === 'folder') {
      Meteor.call('newFolder', {
        name,
        parentId: focusFolder && focusFolder._id,
        bookId,
      }, (err) => {
        if (err) {
          console.error(err);
          showError(
            intl.messages['novelDetail.createFailed'],
            err.reason
          );
          return;
        }

        showSuccess(intl.messages['novelDetail.createSuccess']);
        hideCreateItemModal();
      });
    } else {
      Meteor.call('newFile', {
        name,
        folderId: focusFolder && focusFolder._id,
        template,
      }, (err) => {
        if (err) {
          console.error(err);
          showError(
            intl.messages['novelDetail.createFailed'],
            err.reason
          );
          return;
        }

        showSuccess(intl.messages['novelDetail.createSuccess']);
        hideCreateItemModal();
      });
    }
  }
  render() {
    const {
      focusFolder,
      isShowCreateItemModal,
      hideCreateItemModal,
    } = this.props;

    let isTemplateOrSettingsFolder = false;

    if (focusFolder &&
      (focusFolder.folderType === 'template' ||
      focusFolder.folderType === 'settings')
    ) {
      isTemplateOrSettingsFolder = true;
    }

    return (
      <Modal
        show={isShowCreateItemModal}
        onHide={hideCreateItemModal}
      >
        <div className="modal-content">
          <form onSubmit={this.createItem}>
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                <i className="icon-document-add"></i>
                <FormattedMessage
                  id="novelDetail.createItem"
                  defaultMessage="novelDetail.createItem"
                />
              </h4>
            </div>
            <div className="modal-body">
              <div className="create-new-item-content">
                <div className="form-group">
                  <label>
                    <FormattedMessage
                      id="novelDetail.name"
                      defaultMessage="novelDetail.name"
                    />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                  />
                </div>
                <div className="form-group">
                  <label>
                    <FormattedMessage
                      id="novelDetail.type"
                      defaultMessage="novelDetail.type"
                    />
                  </label>
                  <select
                    className="form-control"
                    name="type"
                    value={this.state.type}
                    onChange={this.typeChange}
                  >
                  {
                    !isTemplateOrSettingsFolder ?
                    <option value="folder">
                      <FormattedMessage
                        id="novelDetail.folder"
                        defaultMessage="novelDetail.folder"
                      />
                    </option> : ''
                  }
                    <option value="file">
                      <FormattedMessage
                        id="novelDetail.file"
                        defaultMessage="novelDetail.file"
                      />
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <FormattedMessage
                      id="novelDetail.template"
                      defaultMessage="novelDetail.template"
                    />
                  </label>
                  <select
                    className="form-control"
                    name="template"
                    onChange={this.templateChange}
                    value={this.state.templateId}
                    disabled={!this.state.isShowTemplate}
                  >
                    <option value="">
                      <FormattedMessage
                        id="novelDetail.none"
                        defaultMessage="novelDetail.none"
                      />
                    </option>
                  {
                    this.props.templateFiles.map(obj => {
                      return (
                        <option key={obj._id} value={obj._id}>
                          {obj.name}
                        </option>
                      );
                    })
                  }
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default btn-close"
                onClick={hideCreateItemModal}
                type="reset"
              >
                <i className="fa fa-times"></i>
                <FormattedMessage
                  id="novelDetail.close"
                  defaultMessage="novelDetail.close"
                />
              </button>
              <button type="submit" className="btn btn-primary btn-confirm">
                <i className="fa fa-check"></i>
                <FormattedMessage
                  id="novelDetail.confirm"
                  defaultMessage="novelDetail.confirm"
                />
              </button>
            </div>
          </form>

        </div>
      </Modal>
    );
  }
}
