import React, { PropTypes, Component, cloneElement } from 'react';

import { ToastContainer, ToastMessage } from 'react-toastr';
import { createContainer } from 'meteor/react-meteor-data';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

import {
  addLocaleData,
  IntlProvider,
  injectIntl,
  // FormattedMessage,
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
  render() {
    const {
      content,
      changeLanguage,
      intl,
    } = this.props;

    return (
      <div>
        <div>
          {cloneElement(content, {
            changeLanguage,
            showSuccess: this.showSuccess,
            showError: this.showError,
            showWarning: this.showWarning,
            intl,
          })}
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

const InnerLayoutBlank = injectIntl(a);

InnerLayoutBlank.propTypes = {
  content: PropTypes.element.isRequired,
};

export class LayoutBlank1 extends Component {
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
        <InnerLayoutBlank
          {...this.props}
          changeLanguage={this.changeLanguage}
        />
      </IntlProvider>
    );
  }
}

export const LayoutBlank = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, LayoutBlank1);
