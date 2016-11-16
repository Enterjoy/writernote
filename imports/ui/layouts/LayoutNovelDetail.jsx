import React, { PropTypes, Component, cloneElement } from 'react';

import { CountdownButton } from '../components/CountdownButton/CountdownButton.jsx';

import { ToastContainer, ToastMessage } from 'react-toastr';
import { createContainer } from 'meteor/react-meteor-data';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

import { FlowRouter as FR } from 'meteor/kadira:flow-router';
import R from 'ramda';

import {
  convertFromRaw,
} from 'draft-js';

import { stateToHTML } from 'draft-js-export-html';


import classNames from 'classnames';

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

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.showShareModal = this.showShareModal.bind(this);
    this.hideShareModal = this.hideShareModal.bind(this);

    this.showExportModal = this.showExportModal.bind(this);
    this.hideExportModal = this.hideExportModal.bind(this);
    this.preview = this.preview.bind(this);

    this.state = {
      isShowDropdown: false,
      isShowShareModal: false,
      isShowExportModal: false,
    };
  }
  preview() {
    const fileId = FR.getQueryParam('fileId');
    if (fileId) {
      Meteor.call('getPreviewBlocks', {
        id: fileId,
      }, (err, data) => {

        if (err) {
          console.error(err);
          return;
        }

        let html = '';

        if (data.length > 0) {
          const content = {
            entityMap: {},
            blocks: data,
          };

          html = stateToHTML(convertFromRaw(content));
        }

        const normalizeHTML = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title></title>
            </head>
            <body style="font-size: 14px; line-height: 14px;">
              ${
                R.replace(/<h1>page_break<\/h1>/g, '<p style="page-break-after:always;"></p>', html)
              }
            </body>
          </html>
        `;

        const uri = `data:text/html;charset=utf-8,${encodeURIComponent(normalizeHTML)}`;

        window.open(uri);
      });
    }
  }
  showShareModal() {
    this.setState({
      isShowShareModal: true,
    });
  }
  hideShareModal() {
    this.setState({
      isShowShareModal: false,
    });
  }
  showExportModal() {
    this.setState({
      isShowExportModal: true,
    });
  }
  hideExportModal() {
    this.setState({
      isShowExportModal: false,
    });
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
  toggleDropdown() {
    this.setState({
      isShowDropdown: !this.state.isShowDropdown,
    });
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

    const dropdownClass = classNames({
      dropdown: true,
      hide: !this.state.isShowDropdown,
    });

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
        <div className="header novel-detail-layout">
          <div className="container-fluid">
            <a href="/dashboard" className="logo">
              <img src="/images/logo.svg" />
            </a>
            <h1 className="novel-name">
              <FormattedMessage
                id="layoutNovel.h1"
                defaultMessage="layoutNovel.h1"
              />
            </h1>
            <CountdownButton />
            <div className="btn-group actions-detail">
              <button
                className="btn btn-primary btn-preview"
                onClick={this.preview}
              >
                <i className="fa fa-play-circle-o" aria-hidden="true"></i>
                <FormattedMessage
                  id="layoutNovel.preview"
                  defaultMessage="layoutNovel.preview"
                />
              </button>
              <button
                type="button"
                className="btn btn-primary btn-export"
                onClick={this.showExportModal}
              >
                <i className="fa fa-download" aria-hidden="true"></i>
                <FormattedMessage
                  id="layoutNovel.export"
                  defaultMessage="layoutNovel.export"
                />
              </button>
              <button
                type="button"
                className="btn btn-primary btn-share"
                onClick={this.showShareModal}
              >
                <i className="fa fa-share-alt" aria-hidden="true"></i>
                <FormattedMessage
                  id="layoutNovel.share"
                  defaultMessage="layoutNovel.share"
                />
              </button>
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
          <div className="right">
            <div
              className="user-info"
              onClick={this.toggleDropdown}
            >
              <span className="">
                {user && user.email()}
              </span>
              <i className="fa fa-sort-desc" aria-hidden="true"></i>
            </div>
            <div className={dropdownClass}>
              <ul className="action-list">
                {/* <li className="action-item">
                  <button className="btn btn-primary">
                    <FormattedMessage
                      id="layoutNovel.edit"
                      defaultMessage="layoutNovel.edit"
                    />
                  </button>
                </li> */}
                <li className="action-item">
                  <button
                    className="btn btn-primary"
                    onClick={this.logout}
                  >
                    <FormattedMessage
                      id="layoutNovel.logout"
                      defaultMessage="layoutNovel.logout"
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {cloneElement(content, {
            changeLanguage,
            isShowShareModal: this.state.isShowShareModal,
            isShowExportModal: this.state.isShowExportModal,
            showSuccess: this.showSuccess,
            showError: this.showError,
            showWarning: this.showWarning,
            showShareModal: this.showShareModal,
            hideShareModal: this.hideShareModal,
            showExportModal: this.showExportModal,
            hideExportModal: this.hideExportModal,
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

const InnerLayout = injectIntl(a);

InnerLayout.propTypes = {
  content: PropTypes.element.isRequired,
};

export class LayoutNovelDetail1 extends Component {
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

export const LayoutNovelDetail = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, LayoutNovelDetail1);
