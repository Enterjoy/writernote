import React, { Component } from 'react';
import classNames from 'classnames';
import { File } from './File/File.jsx';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';

export class Folder extends Component {
  constructor(props) {
    super(props);

    this.showRestoreFolder = this.showRestoreFolder.bind(this);
  }
  getLink() {
    const {
      bookId,
      _id,
    } = this.props;

    return FR.path('NovelDetailPage', {
      bookId,
    }, {
      folderId: _id,
    });
  }
  showRestoreFolder() {
    const {
      _id,
      showRestoreModal,
      setFocusRestoreFolder,
      setFocusRestoreFile,
    } = this.props;

    setFocusRestoreFolder(_id);
    setFocusRestoreFile(null);
    showRestoreModal();
  }
  renderChildren() {
    return this.props.children.map(f => {
      if (f.type === 'folder') {
        return <Folder key={f._id} {...this.props} {...f} />;
      }
      return <File key={f._id} {...this.props} {...f} />;
    });
  }
  render() {
    const {
      name,
      // isActive,
      isFocus,
      isDelete,
    } = this.props;

    const divClass = classNames({
      folder: true,
      active: true,
      focus: isFocus,
      'has-children': true,
    });

    let onClick = undefined;
    let link = this.getLink();

    if (isDelete) {
      onClick = this.showRestoreFolder;
      link = undefined;
    }

    return (
      <div className={divClass}>
        <a
          href={link}
          onClick={onClick}
        >
          <i className="icon-folder"></i>
          <span>{name}</span>
        </a>
        <div className="children-content">
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}
