import React from 'react';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Layout } from '../../ui/layouts/Layout.jsx';
import { LayoutBlank } from '../../ui/layouts/LayoutBlank.jsx';
import { LayoutNovelDetail } from '../../ui/layouts/LayoutNovelDetail.jsx';

import HomePage from '../../ui/pages/HomePage/HomePage.js';
import SignInPage from '../../ui/pages/SignInPage/SignInPage.js';
import Dashboard from '../../ui/pages/DashboardPage/DashboardPage.js';
import NovelDetailPage from '../../ui/pages/NovelDetailPage/NovelDetailPage.js';
import ForgotPasswordPage from '../../ui/pages/ForgotPasswordPage/ForgotPasswordPage.js';
import AdminPage from '../../ui/pages/AdminPage/AdminPage.js';

import ResetPasswordPage from '../../ui/pages/ResetPasswordPage/ResetPasswordPage.js';

import ShareInvitation from '../../ui/pages/ShareInvitation/ShareInvitation.js';

const goDashboardIfLogin = (ctx, redirect) => {
  if (Meteor.userId()) {
    redirect('/dashboard');
  }
};

const goSigninIfLogout = (ctx, redirect) => {
  if (!Meteor.userId()) {
    redirect('/sign-in');
  }
};

FR.triggers.enter([goDashboardIfLogin], {
  only: [
    'HomePage',
    'SignInPage',
  ],
});

FR.triggers.enter([goSigninIfLogout], {
  except: [
    'HomePage',
    'SignInPage',
    'ForgotPasswordPage',
    'ResetPasswordPage',
    'ShareInvitation',
  ],
});


FR.route('/', {
  name: 'HomePage',
  action(params) {
    mount(Layout, {
      content: <HomePage {...params} />,
    });
  }
});

FR.route('/sign-in', {
  name: 'SignInPage',
  action(params) {
    mount(LayoutBlank, {
      content: <SignInPage {...params} />,
    });
  }
});

FR.route('/dashboard', {
  name: 'Dashboard',
  action(params) {
    mount(Layout, {
      content: <Dashboard {...params} />,
    });
  }
});

FR.route('/forgot-password', {
  name: 'ForgotPasswordPage',
  action(params) {
    mount(LayoutBlank, {
      content: <ForgotPasswordPage {...params} />,
    });
  }
});

FR.route('/reset-password/:token', {
  name: 'ResetPasswordPage',
  action(params) {
    mount(LayoutBlank, {
      content: <ResetPasswordPage {...params} />,
    });
  }
});

FR.route('/admin', {
  name: 'AdminPage',
  action(params) {
    mount(Layout, {
      content: <AdminPage {...params} />,
    });
  }
});

FR.route('/novel-detail/:bookId', {
  name: 'NovelDetailPage',
  action(params, query) {
    const props = {
      ...params,
      ...query,
    };

    mount(LayoutNovelDetail, {
      content: <NovelDetailPage {...props} />,
    });
  }
});

FR.route('/invite/:token/:bookId', {
  name: 'ShareInvitation',
  action(params) {
    mount(LayoutBlank, {
      content: <ShareInvitation {...params} />,
    });
  }
});
