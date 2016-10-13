import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import '../../../stylesheets/DashboardPage.scss';

import { CreateNovelModal } from './CreateNovelModal/CreateNovelModal.jsx';

import { DeleteNovelModal } from './DeleteNovelModal/DeleteNovelModal.jsx';

import { DashboardChart } from './DashboardChart/DashboardChart.jsx';

import { NovelItem } from './NovelItem/NovelItem.jsx';

export class DashboardPage extends Component {
  renderBookItem() {
    const props = this.props;
    return props.books.map(book => {
      return <NovelItem key={book._id} book={book} {...props} />;
    });
  }
  render() {
    const {
      showCreateModal,
    } = this.props;

    return (
      <div className="dashboard-page page">
        <DashboardChart {...this.props} />
        <div className="novels-list">
          <div className="container">
            <h2 className="title">
              <FormattedMessage
                id="dashboard.myNovals"
                defaultMessage="dashboard.myNovals"
              />
            </h2>
            <div className="actions-list">
              <a
                className="add-new-novel"
                onClick={showCreateModal}
              >
                <i className="icon-document-add"></i>
              </a>
            </div>
            <div className="row">
              {this.renderBookItem()}
            </div>
          </div>
        </div>

        <CreateNovelModal {...this.props} />
        <DeleteNovelModal {...this.props} />
      </div>
    );
  }
}
