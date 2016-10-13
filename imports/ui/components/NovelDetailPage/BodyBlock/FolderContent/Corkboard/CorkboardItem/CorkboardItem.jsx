import React, { Component } from 'react';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';

export class CorkboardItem extends Component {
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
  renderContent() {
    const {
      type,
      synopsis,
    } = this.props;

    if (type === 'folder') {
      return (
        <p>{synopsis}</p>
      );
    }

    return (
      <p>file content</p>
    );
  }
  render() {
    const {
      name,
    } = this.props;

    return (
      <li className="chapter-block">
        <div className="title">
          <a href={this.getLink()}>
            <i className="fa fa-file-text" aria-hidden="true"></i>
            <h4>{name}</h4>
          </a>
        </div>
        <div className="content">
          {this.renderContent()}
        </div>
      </li>
    );
  }
}
