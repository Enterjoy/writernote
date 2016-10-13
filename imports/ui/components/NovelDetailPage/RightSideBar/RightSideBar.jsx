import React, { Component } from 'react';

import { Synopsis } from './Synopsis/Synopsis.jsx';
import { General } from './General/General.jsx';
import { Note } from './Note/Note.jsx';
import { FileViewer } from './FileViewer/FileViewer.jsx';

export class RightSideBar extends Component {
  render() {
    const {
      toggleRightSidebar,
    } = this.props;

    return (
      <div className="sidebar-right sidebar">
        <div className="header-block">
          <a
            className="hide-sidebar-right"
            onClick={toggleRightSidebar}
          >
            <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
          </a>
        </div>
        <FileViewer {...this.props} />
        <Synopsis {...this.props} />
        <Note {...this.props} />
        <General {...this.props} />
      </div>
    );
  }
}
