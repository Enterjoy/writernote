import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { Accounts } from 'meteor/accounts-base';

import '../../../stylesheets/SignInPage.scss';
import '../../../stylesheets/ForgotPasswordPage.scss';

export class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.resetPassword = this.resetPassword.bind(this);
  }
  resetPassword(e) {
    e.preventDefault();

    const {
      showError,
      showSuccess,

      intl,
    } = this.props;

    const email = e.target.email.value.trim().toLowerCase();

    // XXX: shoule have a loading here, sending email is too long
    Accounts.forgotPassword({email: email}, (error) => {
      if (error) {
        showError(
          intl.messages['forgotPassword.fail'],
          error.reason
        );
        return;
      }
      showSuccess(intl.messages['forgotPassword.success']);
    });
    e.target.reset();
  }
  render() {
    return (
      <div className="signin-page page forgot-password-page">
        <div className="container">
          <h1>
            <FormattedMessage
              id="forgotPassword.h1"
              defaultMessage="forgotPassword.h1"
            />
          </h1>
          <div className="signin-content">
            <form
              className="signin-form"
              onSubmit={this.resetPassword}
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
                  name="email"
                />
              </div>
              <button
                className="btn btn-primary signin-btn green-bg"
                type="submit"
              >
                <FormattedMessage
                  id="forgotPassword.send"
                  defaultMessage="forgotPassword.send"
                />
              </button>
              <a
                href="/sign-in"
                className="sign-in-btn"
              >
                <FormattedMessage
                  id="forgotPassword.signin"
                  defaultMessage="forgotPassword.signin"
                />
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
