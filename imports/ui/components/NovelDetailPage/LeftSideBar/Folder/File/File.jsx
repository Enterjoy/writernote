import React, { Component } from 'react';
import classNames from 'classnames';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';

export class File extends Component {
  constructor(props) {
    super(props);

    this.showRestoreFile = this.showRestoreFile.bind(this);
  }
  getLink() {
    const {
      bookId,
      _id,
      folderId,
    } = this.props;

    return FR.path('NovelDetailPage', {
      bookId,
    }, {
      folderId,
      fileId: _id,
    });
  }
  showRestoreFile() {
    const {
      _id,
      showRestoreModal,
      setFocusRestoreFile,
      setFocusRestoreFolder,
    } = this.props;

    setFocusRestoreFile(_id);
    setFocusRestoreFolder(null);
    showRestoreModal();
  }
  render() {
    const {
      name,
      isActive,
      isFocus,
      isDelete,
    } = this.props;

    const divClass = classNames({
      file: true,
      active: isActive,
      focus: isFocus,
    });

    let onClick = undefined;
    let link = this.getLink();

    if (isDelete) {
      onClick = this.showRestoreFile;
      link = undefined;
    }

    return (
      <div className={divClass}>
        <a
          href={link}
          onClick={onClick}
        >
          <i className="icon-file-empty"></i>
          <span>{name}</span>
        </a>
      </div>
    );
  }
}
