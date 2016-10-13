import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import classNames from 'classnames';
import moment from 'moment';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


export class Stat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{
        name: 'none',
        users: 0,
        books: 0,
      }],
      type: 'week', // or month
    };

    this.weekClick = this.weekClick.bind(this);
    this.monthClick = this.monthClick.bind(this);
  }
  componentDidMount() {
    const to = new Date;
    const from = moment(to).subtract(7, 'days').toDate();

    Meteor.call('adminGetChartData', {
      to,
      from,
    }, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      this.setState({
        type: 'week',
        data,
      });
    });
  }
  weekClick() {
    const {
      showError,
      intl,
    } = this.props;

    const to = new Date;
    const from = moment(to).subtract(7, 'days').toDate();

    Meteor.call('adminGetChartData', {
      to,
      from,
    }, (err, data) => {
      if (err) {
        showError(
          intl.messages['dashboard.getChartFail'],
          err.reason
        );
        return;
      }

      this.setState({
        type: 'week',
        data,
      });
    });
  }
  monthClick() {
    const {
      showError,
      intl,
    } = this.props;

    const to = new Date;
    const from = moment(to).subtract(30, 'days').toDate();

    Meteor.call('adminGetChartData', {
      to,
      from,
    }, (err, data) => {
      if (err) {
        showError(
          intl.messages['dashboard.getChartFail'],
          err.reason
        );
        return;
      }

      this.setState({
        type: 'month',
        data,
      });
    });
  }
  render() {
    const {
      data,
      type,
    } = this.state;

    const weekClass = classNames({
      btn: true,
      'btn-primary': true,
      active: type === 'week',
    });

    const monthClass = classNames({
      btn: true,
      'btn-primary': true,
      active: type === 'month',
    });

    return (
      <div className="statistic-block">
        <div className="container">
          <h2 className="title">
            <FormattedMessage
              id="dashboard.systemStat"
              defaultMessage="admin.systemStat"
            />
          </h2>
          <div className="btn-group">
            <button
              className={weekClass}
              onClick={this.weekClick}
            >
              <FormattedMessage
                id="dashboard.thisweek"
                defaultMessage="dashboard.thisweek"
              />
            </button>
            <button
              className={monthClass}
              onClick={this.monthClick}
            >
              <FormattedMessage
                id="dashboard.thismonth"
                defaultMessage="dashboard.thismonth"
              />
            </button>
          </div>
          <div className="chart-block">
            <ResponsiveContainer>
              <LineChart
                data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  activeDot={{r: 7}}
                />
                <Line
                  type="monotone"
                  dataKey="books"
                  stroke="#82ca9d"
                  activeDot={{r: 7}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}
