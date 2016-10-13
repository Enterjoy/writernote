import React, { Component } from 'react';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';

export class DetailsItem extends Component {
  constructor(props) {
    super(props);

    this.labelChange = this.labelChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
  }
  getLink() {
    const {
      type,
      _id,
      bookId,
      folderId,
    } = this.props;

    const fileId = type === 'file' ? _id : undefined;
    const foId = type === 'file' ? folderId : _id;

    return FR.path('NovelDetailPage', {
      bookId,
    }, {
      folderId: foId,
      fileId,
    });
  }
  labelChange(e) {
    const {
      _id,
      intl,
    } = this.props;

    Meteor.call('updateFolderLabel', {
      _id,
      label: e.target.value,
    }, (err) => {
      if (err) {
        console.error(err);
        this.props.showError(
          intl.messages.error,
          err.reason
        );
        return;
      }
      this.props.showSuccess(
        intl.messages.success,
        '',
      );
    });
  }
  statusChange(e) {
    const {
      _id,
      intl,
    } = this.props;

    Meteor.call('updateFolderStatus', {
      _id,
      status: e.target.value,
    }, (err) => {
      if (err) {
        console.error(err);
        this.props.showError(
          intl.messages.error,
          err.reason
        );
        return;
      }
      this.props.showSuccess(
        intl.messages.success,
        '',
      );
    });
  }
  render() {
    const {
      name,
      status,
      label,
      type,
      words,
      characters,
    } = this.props;

    return (
      <tr>
        <td>
        <a href={this.getLink()}>
          <span>{name}</span>
        </a>
        </td>
        <td>
          <select
            className="form-control"
            value={label}
            onChange={this.labelChange}
            disabled={type === 'file'}
          >
            <option value="label1">label1</option>
            <option value="label2">label2</option>
            <option value="label3">label3</option>
          </select>
        </td>
        <td>
          <select
            className="form-control"
            value={status}
            onChange={this.statusChange}
            disabled={type === 'file'}
          >
            <option value="working">working</option>
            <option value="done">done</option>
          </select>
        </td>
        <td>
          <span>{words}</span>
        </td>
        <td>
          <span>{characters}</span>
        </td>
      </tr>
    );
  }
}
