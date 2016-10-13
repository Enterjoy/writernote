import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { Accounts } from 'meteor/accounts-base';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';

import '../../../stylesheets/SignInPage.scss';
import '../../../stylesheets/ForgotPasswordPage.scss';

export class ShareInvitation extends Component {
  constructor(props) {
    super(props);

    this.updatePassword = this.updatePassword.bind(this);
  }
  updatePassword(e) {
    e.preventDefault();
    const t = e.target;

    const {
      showError,
      showSuccess,

      intl,
      token,
      bookId,
    } = this.props;

    const password = t.password.value.trim();

    Accounts.resetPassword(token, password, (error) => {
      t.reset();
      if (error) {
        showError(
          intl.messages['resetPassword.fail'],
          error.reason
        );
        return;
      } else {
        FR.go(FR.path('NovelDetailPage', {
          bookId,
        }));
        showSuccess(intl.messages['resetPassword.success']);
      }
    });
  }
  render() {
    return (
      <div className="signin-page page forgot-password-page">
        <div className="container">
          <h1>
            <FormattedMessage
              id="shareInvitation.h1"
              defaultMessage="shareInvitation.h1"
            />
          </h1>
          <div className="signin-content">
            <form
              className="signin-form"
              onSubmit={this.updatePassword}
            >
              <div className="form-group email-address">
                <label className="">
                  <FormattedMessage
                    id="resetPassword.password"
                    defaultMessage="resetPassword.password"
                  />
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                />
              </div>
              <button
                className="btn btn-primary signin-btn green-bg"
                type="submit"
              >
                <FormattedMessage
                  id="shareInvitation.set"
                  defaultMessage="shareInvitation.set"
                />
              </button>
              <a href="/sign-in" className="sign-in-btn">
                <FormattedMessage
                  id="shareInvitation.signin"
                  defaultMessage="shareInvitation.signin"
                />
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
