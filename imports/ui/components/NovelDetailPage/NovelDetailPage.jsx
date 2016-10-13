import React, { Component } from 'react';
import '../../../stylesheets/NovelDetailPage.scss';

import classNames from 'classnames';

import { LeftSideBar } from './LeftSideBar/LeftSideBar.jsx';
import { RightSideBar } from './RightSideBar/RightSideBar.jsx';

import { BodyBlock } from './BodyBlock/BodyBlock.jsx';
import { ShareModal } from './ShareModal/ShareModal.jsx';

import { ExportModal } from './ExportModal/ExportModal.jsx';

export class NovelDetailPage extends Component {
  render() {
    const {
      isShowLeftSidebar,
      isShowRightSidebar,
    } = this.props;

    const divClass = classNames({
      'novel-detail-page': true,
      page: true,
      'hide-sidebar-left': !isShowLeftSidebar,
      'hide-sidebar-right': !isShowRightSidebar,
    });

    return (
      <div className={divClass}>
        <div className="container-fluids">
          <LeftSideBar {...this.props} />
          <BodyBlock {...this.props} />
          <RightSideBar {...this.props} />
        </div>

        <ShareModal {...this.props} />
        <ExportModal {...this.props} />
      </div>
    );
  }
}
