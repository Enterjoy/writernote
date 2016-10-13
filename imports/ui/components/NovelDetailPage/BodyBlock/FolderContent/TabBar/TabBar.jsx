import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export class TabBar extends Component {
  render() {
    return (
      <ul className="nav nav-tabs" role="tablist">
        <li role="presentation">
          <a
            href="#details"
            aria-controls="details"
            role="tab" data-toggle="tab"
          >
          <i className="fa fa-th-large" aria-hidden="true"></i>
          <FormattedMessage
            id="novelDetail.details"
            defaultMessage="novelDetail.details"
          />
          </a>
        </li>
        <li role="presentation">
          <a href="#outliner" aria-controls="outliner" role="tab" data-toggle="tab">
          <i className="fa fa-th" aria-hidden="true"></i>
          <FormattedMessage
            id="novelDetail.corkboard"
            defaultMessage="novelDetail.corkboard"
          />
          </a>
        </li>
        <li role="presentation" className="active">
          <a href="#corkboard" aria-controls="corkboard" role="tab" data-toggle="tab">
          <i className="fa fa-th-list" aria-hidden="true"></i>
          <FormattedMessage
            id="novelDetail.outliner"
            defaultMessage="novelDetail.outliner"
          />
          </a>
        </li>
      </ul>

    );
  }
}
