import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { TabBar } from './TabBar/TabBar.jsx';

import { Outliner } from './Outliner/Outliner.jsx';
import { Corkboard } from './Corkboard/Corkboard.jsx';
import { Details } from './Details/Details.jsx';

export class FolderContent extends Component {
  render() {
    const {
      focusFolder,
    } = this.props;

    return (
      <div className="">
        <TabBar {...this.props} />
        <div className="tab-content">
          <Outliner {...this.props} />
          <Corkboard {...this.props} />
          <Details {...this.props} />
        </div>
        <div className="footer-block">
          <div className="words-count">
            <label>
              <FormattedMessage
                id="novelDetail.words"
                defaultMessage="novelDetail.words"
              />:
            </label>
            <span>{focusFolder && focusFolder.words}</span>
          </div>
          <div className="chars-count">
            <label>
              <FormattedMessage
                id="novelDetail.characters"
                defaultMessage="novelDetail.characters"
              />:
            </label>
            <span>{focusFolder && focusFolder.characters}</span>
          </div>
        </div>

      </div>

    );
  }
}
