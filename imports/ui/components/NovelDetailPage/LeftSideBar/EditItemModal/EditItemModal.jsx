import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import React, { Component } from 'react';

import R from 'ramda';

export class EditItemModal extends Component {
  constructor(props) {
    super(props);

    this.editItem = this.editItem.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeFolder = this.changeFolder.bind(this);
    this.changePosition = this.changePosition.bind(this);

    this.state = {
      name: '',
      parentId: '',
      position: 1,
    };
  }
  componentWillReceiveProps(props) {
    const {
      focusFile,
      focusFolder,
    } = props;

    const isFile = !!focusFile;

    if (isFile) {
      this.setState({
        name: focusFile.name,
        parentId: focusFile.folderId,
        position: focusFile.index,
      });
    } else {
      this.setState({
        name: focusFolder.name,
        parentId: focusFolder.parentId,
        position: focusFolder.index,
      });
    }
  }
  editItem() {
    const {
      name,
      parentId,
      position,
    } = this.state;

    const {
      fileId,
      folderId,
      focusFolder,

      showError,
      showSuccess,

      intl,
    } = this.props;

    const indexList = this.indexList;

    const obj = R.find(R.propEq('value', parseFloat(position)), indexList || []);

    if (fileId) {
      Meteor.call('updateFile', {
        _id: fileId,
        name,
        parentId,
        position: obj && obj.name || 1,
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
    } else {
      Meteor.call('updateFolder', {
        _id: folderId,
        name,
        parentId: focusFolder.type === 'normal' ? parentId : 'parentId',
        position: obj && obj.name || 1,
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

  }
  changeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  changeFolder(e) {
    this.setState({
      parentId: e.target.value,
    });
  }
  changePosition(e) {
    e.persist();
    this.setState({
      position: e.target.value,
    });
  }
  renderHeader() {
    const {
      focusFile,
    } = this.props;

    const isFile = !!focusFile;

    if (isFile) {
      return (
        <h4 className="modal-title">
          <i className="fa fa-pencil-square-o"></i>
          <FormattedMessage
            id="editItem.editFile"
            defaultMessage="editItem.editFile"
          />
        </h4>
      );
    }

    return (
      <h4 className="modal-title">
        <i className="fa fa-pencil-square-o"></i>
        <FormattedMessage
          id="editItem.editFolder"
          defaultMessage="editItem.editFolder"
        />
      </h4>
    );
  }
  render() {
    this.indexList = [];
    const {
      isShowEditItemModal,

      hideEditItemModal,
      focusFolder,
      focusFile,
      possibleParent,
    } = this.props;

    const isFile = !!focusFile;

    const {
      name,
      parentId,
      position,
    } = this.state;

    const focusParent = R.find(R.propEq('_id', parentId), possibleParent);
    const list = focusParent && R.clone(focusParent.childrenCount);

    if (isFile) {
      if (parentId !== focusFile.folderId) {
        // list++;
        const length = list && list.length;

        list && list.push({
          value: length,
          name: length + 1,
        });
      }
    } else {
      if (parentId !== focusFolder.parentId) {
        // list++;
        const length = list && list.length;

        list && list.push({
          value: length,
          name: length + 1,
        });
      }
    }
    this.indexList = list;

    return (
      <Modal
        show={isShowEditItemModal}
        onHide={hideEditItemModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            {this.renderHeader()}
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>
                <FormattedMessage
                  id="editItem.name"
                  defaultMessage="editItem.name"
                />
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={this.changeName}
              />
            </div>
            <div className="choose-folder-block">
              <div className="form-group">
                <label className="">
                  <FormattedMessage
                    id="editItem.folder"
                    defaultMessage="editItem.folder"
                  />
                </label>
                <select
                  className="form-control"
                  value={parentId}
                  onChange={this.changeFolder}
                >
                {
                  possibleParent.map(obj => {
                    return (<option
                      value={obj._id}
                      key={obj._id}
                    >{obj.name}</option>);
                  })
                }
                </select>
              </div>
            </div>
            <div className="choose-position-block">
              <div className="form-group">
                <label className="">
                  <FormattedMessage
                    id="editItem.position"
                    defaultMessage="editItem.position"
                  />
                </label>
                <select
                  className="form-control"
                  value={position}
                  onChange={this.changePosition}
                >
                {
                  list && list.map(obj => {
                    return (<option
                      value={obj.value}
                      key={obj.value}
                    >{obj.name}</option>);
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
              onClick={hideEditItemModal}
            >
              <i className="fa fa-times"></i>
              <FormattedMessage
                id="editItem.close"
                defaultMessage="editItem.close"
              />
            </button>
            <button
              className="btn btn-primary btn-confirm"
              onClick={this.editItem}
            >
              <i className="fa fa-check"></i>
              <FormattedMessage
                id="editItem.confirm"
                defaultMessage="editItem.confirm"
              />
            </button>
          </div>

        </div>
      </Modal>

    );
  }
}
