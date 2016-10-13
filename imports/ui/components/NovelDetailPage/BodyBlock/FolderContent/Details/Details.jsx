import React, { Component } from 'react';
import { DetailsItem } from './DetailsItem/DetailsItem.jsx';
import { FormattedMessage } from 'react-intl';

export class Details extends Component {
  renderItem() {
    const {
      focusFolder,
    } = this.props;

    return focusFolder.children.map(obj => {
      return <DetailsItem key={obj._id} {...this.props} {...obj} />;
    });
  }
  render() {
    return (
      <div
        role="tabpanel"
        className="tab-pane tab-details"
        id="details"
      >
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="title-th">
                <FormattedMessage
                  id="novelDetail.title"
                  defaultMessage="novelDetail.title"
                />
              </th>
              <th className="label-th">
                <FormattedMessage
                  id="novelDetail.label"
                  defaultMessage="novelDetail.label"
                />
              </th>
              <th className="status-th">
                <FormattedMessage
                  id="novelDetail.status"
                  defaultMessage="novelDetail.status"
                />
              </th>
              <th className="words-th">
                <FormattedMessage
                  id="novelDetail.words"
                  defaultMessage="novelDetail.words"
                />
              </th>
              <th className="chars-th">
                <FormattedMessage
                  id="novelDetail.characters"
                  defaultMessage="novelDetail.characters"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderItem()}
          </tbody>
        </table>
      </div>
    );
  }
}
