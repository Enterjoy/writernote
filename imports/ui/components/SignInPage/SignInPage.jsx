import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';

import '../../../stylesheets/SignInPage.scss';

export class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.loginWithPassword = this.loginWithPassword.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }
  loginWithPassword(e) {
    e.preventDefault();

    const {
      intl,
    } = this.props;

    const target = e.target;

    const email = target.email.value.trim();
    const password = target.password.value.trim();

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.error(error);
        this.props.showError(
          intl.messages['signin.error'],
          error.reason
        );
      } else {
        FR.go('Dashboard');
      }
    });
  }
  loginWithFacebook() {
    const {
      intl,
    } = this.props;

    Meteor.loginWithFacebook((error) => {
      if (error) {
        console.error(error);
        this.props.showError(
          intl.messages['signin.error'],
          error.reason
        );
      } else {
        FR.go('Dashboard');
      }
    });
  }
  loginWithGoogle() {
    const {
      intl,
    } = this.props;

    Meteor.loginWithGoogle((error) => {
      if (error) {
        console.error(error);
        this.props.showError(
          intl.messages['signin.error'],
          error.reason
        );
      } else {
        FR.go('Dashboard');
      }
    });
  }
  render() {
    return (
      <div className="signin-page page">
        <div className="container">
          <h1>
            <FormattedMessage
              id="signin.signin"
              defaultMessage="signin.signin"
            />
          </h1>
          <div className="signin-content">
            <form
              className="signin-form"
              onSubmit={this.loginWithPassword}
            >
              <div className="form-group email-address">
                <label className="">
                  <FormattedMessage
                    id="signin.email"
                    defaultMessage="signin.email"
                  />
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email-address"
                  name="email"
                />
              </div>
              <div className="form-group password">
                <label className="">
                  <FormattedMessage
                    id="signin.pass"
                    defaultMessage="signin.pass"
                  />
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <a href="/forgot-password" className="underline forgot-password">
                <FormattedMessage
                  id="signin.forgotPassword"
                  defaultMessage="signin.forgotPassword"
                />
              </a>
              <button
                id=""
                className="btn btn-primary signin-btn green-bg"
                type="submit"
              >
                <FormattedMessage
                  id="signin.signin"
                  defaultMessage="signin.signin"
                />
              </button>
            </form>
            <div className="line">
              <label></label>
              <p className="or">
                <FormattedMessage
                  id="signin.or"
                  defaultMessage="signin.or"
                />
              </p>
              <label></label>
            </div>
            <div className="group-btn">
              <button
                className="btn btn-primary facebook-btn"
                onClick={this.loginWithFacebook}
              >
                <i className="icon-facebook2"></i>
                <span className="">
                  <FormattedMessage
                    id="signin.facebook"
                    defaultMessage="signin.facebook"
                  />
                </span>
              </button>
              <button
                className="btn btn-primary google-btn"
                onClick={this.loginWithGoogle}
              >
                <i className="icon-google2"></i>
                <span className="">
                  <FormattedMessage
                    id="signin.google"
                    defaultMessage="signin.google"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
