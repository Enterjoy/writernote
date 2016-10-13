import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

const Test3 = () => {
  return (
    <div className="">
      <FormattedMessage
        id="test3"
        defaultMessage="this is a test3 component"
      />
    </div>
  );
};

const Test2 = () => {
  return (
    <div className="">
      <FormattedMessage
        id="test2"
        defaultMessage="this is a test2 component"
      />
      <Test3 />
    </div>
  );
};

export class Test extends Component {
  render() {

    return (
      <div className="">
        <FormattedMessage
          id="test"
          defaultMessage="this is a test component"
        />

        <Test2 />

        <div className="">
          <button
            onClick={this.props.changeLanguage.bind(undefined, 'en-US')}
          >Change to En</button>

          <button
            onClick={this.props.changeLanguage.bind(undefined, 'ko-KR')}
          >Change to Ko</button>
        </div>

      </div>
    );
  }
}
