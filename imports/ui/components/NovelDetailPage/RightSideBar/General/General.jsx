import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { Creatable } from 'react-select';

import 'react-select/dist/react-select.css';

export class General extends Component {
  constructor(props) {
    super(props);

    this.labelChange = this.labelChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
  }
  labelChange(val) {

    const {
      focusFolder,
      intl,
    } = this.props;

    Meteor.call('updateFolderLabel', {
      _id: focusFolder._id,
      label: val.value,
    }, (err) => {
      if (err) {
        console.error(err);
        this.props.showError(
          intl.messages.error,
          err.reason
        );
        return;
      }
      this.props.showSuccess(
        intl.messages.success,
        '',
      );
    });
  }
  statusChange(e) {
    const {
      focusFolder,
      intl,
    } = this.props;

    Meteor.call('updateFolderStatus', {
      _id: focusFolder._id,
      status: e.target.value,
    }, (err) => {
      if (err) {
        console.error(err);
        this.props.showError(
          intl.messages.error,
          err.reason
        );
        return;
      }
      this.props.showSuccess(
        intl.messages.success,
        '',
      );
    });
  }
  render() {
    const {
      focusFile,
      focusFolder,
      labels,
    } = this.props;

    const options = labels.map(val => ({
      value: val,
      label: val,
    }));

    if (focusFile) {
      // return <div className="part">file right side bar</div>;
      return null;
    }

    return (
      <div className="general-block part">
        <h4 className="title">
          <i className="fa fa-caret-down" aria-hidden="true"></i>
          <FormattedMessage
            id="novelDetail.general"
            defaultMessage="novelDetail.general"
          />
        </h4>
        <div className="content">
          <div className="label-block">
            <div className="form-group">
              <label className="">
                <FormattedMessage
                  id="novelDetail.label"
                  defaultMessage="novelDetail.label"
                />
              </label>
              <Creatable
                name="form-field-name"
                value={focusFolder && focusFolder.label}
                options={options}
                onChange={this.labelChange}
              />
            </div>
          </div>
          <div className="status-block">
            <div className="form-group">
              <label className="">
                <FormattedMessage
                  id="novelDetail.status"
                  defaultMessage="novelDetail.status"
                />
              </label>
              <select
                className="form-control"
                value={focusFolder && focusFolder.status}
                onChange={this.statusChange}
              >
                <option value="working">
                  <FormattedMessage
                    id="general.working"
                    defaultMessage="general.working"
                  />
                </option>
                <option value="done">
                  <FormattedMessage
                    id="general.done"
                    defaultMessage="general.done"
                  />
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
