import React, { Component } from 'react';

import { FolderContent } from './FolderContent/FolderContent.jsx';

import FileContent from '../../../pages/FileContent/FileContent.js';

export class BodyBlock extends Component {
  render() {
    const {
      isFile,
    } = this.props;

    return (
      <div className="body-block">
        {
          isFile ?
          <FileContent {...this.props} /> :
          <FolderContent {...this.props} />
        }
      </div>
    );
  }
}
