import React, { PropTypes, Component, cloneElement } from 'react';

import { ToastContainer, ToastMessage } from 'react-toastr';

import { FlowRouter as FR } from 'meteor/kadira:flow-router';

import { createContainer } from 'meteor/react-meteor-data';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

import classNames from 'classnames';

import { Roles } from 'meteor/alanning:roles';

import {
  addLocaleData,
  IntlProvider,
  injectIntl,
  FormattedMessage,
} from 'react-intl';

import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';

import '../../stylesheets/Header.scss';
import '../../stylesheets/Reset.scss';
import '../../stylesheets/IconFont.scss';
import '../../stylesheets/Common.scss';


import enLang from '../../lib/i18n/en.js';
import koLang from '../../lib/i18n/ko.js';

addLocaleData(en);
addLocaleData(ko);

class a extends Component {
  constructor(props) {
    super(props);

    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.showWarning = this.showWarning.bind(this);
  }
  showSuccess(title, detail) {
    this.refs.toastr.success(
      detail,
      title, {
        closeButton: true,
        timeOut: 3000,
        preventDuplicates: false,
      }
    );
  }
  showError(title, detail) {
    this.refs.toastr.error(
      detail,
      title, {
        closeButton: true,
        timeOut: 3000,
        preventDuplicates: false,
      }
    );
  }
  showWarning(title, detail) {
    this.refs.toastr.warning(
      detail,
      title, {
        closeButton: true,
        timeOut: 3000,
        preventDuplicates: false,
      }
    );
  }
  logout() {
    Meteor.logout(() => FR.go('SignInPage'));
  }
  render() {
    const {
      content,
      changeLanguage,
      locale,
      intl,
      user,
    } = this.props;

    const isAdmin = Roles.userIsInRole(user && user._id, 'admin');

    const enFlagClass = classNames({
      flag: true,
      'uk-flag': true,
      active: locale === 'en-US',
    });

    const koFlagClass = classNames({
      flag: true,
      'korean-flag': true,
      active: locale === 'ko-KR',
    });

    return (
      <div>
        <div className="header">
          <div className="container-fluid">
            <div className="logo">
              <img src="/images/logo.svg" />
            </div>
            <div className="right">
              {
                user ?
                <a
                  href="#"
                  className="signin-button"
                  onClick={this.logout}
                >
                  <FormattedMessage
                    id="layout.signout"
                    defaultMessage="layout.signout"
                  />
                </a> : ''
              }
              <a href="" className="plans-button">
                <FormattedMessage
                  id="layout.plans"
                  defaultMessage="layout.plans"
                />
              </a>
              {
                isAdmin ?
                <a href="/admin" className="plans-button">
                  <FormattedMessage
                    id="layout.admin"
                    defaultMessage="layout.admin"
                  />
                </a> : ''
              }
            </div>
          </div>
          <div className="languages-block">
            <a
              className={enFlagClass}
              onClick={changeLanguage.bind(undefined, 'en-US')}
            >
              <img src="/images/uk_flag.png" />
            </a>
            <a
              className={koFlagClass}
              onClick={changeLanguage.bind(undefined, 'ko-KR')}
            >
              <img src="/images/korean_flag.png" />
            </a>
          </div>
        </div>
        <div className="sidebar-right hide">
          <div className="menu-header">
            <button id="" className="btn btn-default" type="">
              <FormattedMessage
                id="layout.close"
                defaultMessage="layout.close"
              />
              <i className="icon-cross"></i>
            </button>
          </div>
          <ul className="menu-list">
            <li className="menu-item">
              <a href="" className="/sign-in">
                <FormattedMessage
                  id="layout.signin"
                  defaultMessage="layout.signin"
                />
              </a>
            </li>
            <li className="menu-item">
              <a href="" className="/sign-up">
                <FormattedMessage
                  id="layout.signup"
                  defaultMessage="layout.signup"
                />
              </a>
            </li>
            <li className="menu-item">
              <a href="/dashboard" className="">
                <FormattedMessage
                  id="layout.dashboard"
                  defaultMessage="layout.dashboard"
                />
              </a>
            </li>
            <li className="menu-item">
              <a href="/admin" className="">
                <FormattedMessage
                  id="layout.admin"
                  defaultMessage="layout.admin"
                />
              </a>
            </li>
            <li className="menu-item">
              <a href="" className="">
                <FormattedMessage
                  id="layout.plans"
                  defaultMessage="layout.plans"
                />
              </a>
            </li>
          </ul>
        </div>
        <div>
          {cloneElement(content, {
            changeLanguage,
            showSuccess: this.showSuccess,
            showError: this.showError,
            showWarning: this.showWarning,
            intl,
          })}
        </div>
        <div className="footer">
          <div className="container-fluid"></div>
        </div>
        <ToastContainer
          ref="toastr"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right"
        />
      </div>
    );
  }
}

const InnerLayout = injectIntl(a);

InnerLayout.propTypes = {
  content: PropTypes.element.isRequired,
};

export class Layout1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: 'en-US',
      messages: enLang,
      // locale: 'ko-KR',
      // messages: koLang,
    };

    this.changeLanguage = this.changeLanguage.bind(this);
  }
  componentDidMount() {
    this.changeLanguage(Session.get('locale'));
  }
  changeLanguage(locale) {
    Session.set('locale', locale);
    switch (locale) {
      case 'en-US':
        this.setState({
          locale: 'en-US',
          messages: enLang,
        });
        break;
      case 'ko-KR':
        this.setState({
          locale: 'ko-KR',
          messages: koLang,
        });
        break;
      default:
        this.setState({
          locale: 'en-US',
          messages: enLang,
        });
    }
  }
  render() {
    const {
      locale,
      messages,
    } = this.state;

    return (
      <IntlProvider
        locale={locale}
        messages={messages}
      >
        <InnerLayout
          {...this.props}
          locale={locale}
          changeLanguage={this.changeLanguage}
        />
      </IntlProvider>
    );
  }
}

export const Layout = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, Layout1);
