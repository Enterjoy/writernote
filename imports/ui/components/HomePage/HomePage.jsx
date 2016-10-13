import React, { Component } from 'react';
import '../../../stylesheets/HomePage.scss';
import { FormattedMessage } from 'react-intl';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';

export class HomePage extends Component {
  constructor(props) {
    super(props);

    this.signup = this.signup.bind(this);
  }
  signup(e) {
    e.preventDefault();

    const target = e.target;

    const email = target.email.value.trim();
    const password = target.password.value.trim();

    Accounts.createUser({
      email,
      password,
      profile: {},
    }, (err) => {
      if (err) {
        console.error(err);
        this.props.showError('Signup failed', err.reason);
      } else {
        FR.go('Dashboard');
      }
    });

  }
  render() {
    return (
      <div className="home-page page">
        <div className="landing-section">
          <div className="container-fluid">
            <div className="mask-bg"></div>
            <div className="landing-content">
              <h2 className="">
                <FormattedMessage
                  id="homepage.remember"
                  defaultMessage="Remember Everything"
                />
              </h2>
              <p>
                <FormattedMessage
                  id="homepage.desc"
                  defaultMessage="homepage.desc"
                />
              </p>
              <form
                className="signup-form row"
                onSubmit={this.signup}
              >
                <div className="col-md-6">
                  <div className="form-group email-address">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group password">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Passowrd"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <p className="legal">
                    <FormattedMessage
                      id="homepage.confirm"
                      defaultMessage="homepage.confirm"
                    />
                    {' '}
                    <a href="" className="underline">
                      <FormattedMessage
                        id="homepage.tos"
                        defaultMessage="homepage.tos"
                      />
                    </a>
                    {' '}
                    <FormattedMessage
                      id="homepage.and"
                      defaultMessage="homepage.and"
                    />
                    {' '}
                    <a href="/" className="underline">
                      <FormattedMessage
                        id="homepage.pp"
                        defaultMessage="homepage.pp"
                      />
                    </a>
                    .
                  </p>
                  <button
                    className="btn btn-primary green-bg signup-btn"
                    type="submit"
                  >
                    <FormattedMessage
                      id="homepage.signup"
                      defaultMessage="homepage.signup"
                    />
                  </button>
                  <p className="upgrade-toggle-info">
                    <FormattedMessage
                      id="homepage.or"
                      defaultMessage="homepage.or"
                    />
                    {' '}
                    <a href="/sign-in" className="login-link underline">
                      <FormattedMessage
                        id="homepage.signin"
                        defaultMessage="homepage.signin"
                      />
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
