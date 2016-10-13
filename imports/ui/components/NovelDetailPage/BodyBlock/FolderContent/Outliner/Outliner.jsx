import React, { Component } from 'react';

import { OutlinerItem } from './OutlinerItem/OutlinerItem.jsx';

export class Outliner extends Component {
  renderItem() {
    const {
      focusFolder,
    } = this.props;

    return focusFolder && focusFolder.children.map(obj => {
      return <OutlinerItem key={obj._id} {...this.props} {...obj} />;
    });
  }
  render() {
    return (
      <div role="tabpanel"
        className="tab-pane tab-outliner"
        id="outliner"
      >
        <div className="container-fluid">
          <div className="row">
            {this.renderItem()}
          </div>
        </div>
      </div>
    );
  }
}
