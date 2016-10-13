import React, { Component } from 'react';

import { CorkboardItem } from './CorkboardItem/CorkboardItem.jsx';

export class Corkboard extends Component {
  renderItem() {
    const {
      focusFolder,
    } = this.props;

    return focusFolder && focusFolder.children.map(obj => {
      return <CorkboardItem key={obj._id} {...this.props} {...obj} />;
    });
  }
  render() {
    return (
      <div
        role="tabpanel"
        className="tab-pane tab-corkboard active"
        id="corkboard"
      >
        <ul className="chapter-list">
          {this.renderItem()}
        </ul>
      </div>
    );
  }
}
