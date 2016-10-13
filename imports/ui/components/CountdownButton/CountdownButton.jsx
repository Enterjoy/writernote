import React, { Component } from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import { AlertModal } from '../AlertModal/AlertModal.jsx';

const h = str => (str.length === 1 ? `0${str}` : str);

export class CountdownButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 25 * 60,
      isRunning: false,
      isShowAlertModal: false,
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.hideAlertModal = this.hideAlertModal.bind(this);
  }
  hideAlertModal() {
    this.setState({
      isShowAlertModal: false,
    });
  }
  start() {
    this.setState({
      isRunning: true,
    });

    const id = Meteor.setInterval(() => {
      const {
        current,
        isRunning,
      } = this.state;

      if (current <= 0 || !isRunning) {
        Meteor.clearInterval(id);
        this.setState({
          isShowAlertModal: true,
          current: 25 * 60,
          isRunning: false,
        });
        return;
      }

      this.setState({
        current: current - 1,
      });
    }, 1000);
  }
  stop() {
    this.setState({
      current: 25 * 60,
      isRunning: false,
    });
  }
  render() {
    const {
      current,
      isRunning,
      isShowAlertModal,
    } = this.state;

    const dur = moment.duration(current, 'seconds');

    const min = h(dur.minutes().toString());
    const sec = h(dur.seconds().toString());

    const val = `${min}:${sec}`;

    if (isRunning) {
      return (
        <button
          className="btn btn-primary btn-timer red-bg"
          onClick={this.stop}
        >
          <FormattedMessage
            id="dbBtn.stop"
            defaultMessage="dbBtn.stop"
            values={{val}}
          />
        </button>
      );
    }

    return (
      <div className="countdown-btn">
        <button
          className="btn btn-primary btn-timer green-bg"
          onClick={this.start}
        >
          <FormattedMessage
            id="cdBtn.start"
            defaultMessage="cdBtn.start"
            values={{val}}
          />
        </button>
        <AlertModal
          isShowAlertModal={isShowAlertModal}
          hideAlertModal={this.hideAlertModal}
        />
      </div>
    );
  }
}
