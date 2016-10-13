/* global jsPDF */

import { Modal } from 'react-bootstrap';
import {
  convertFromRaw,
} from 'draft-js';


import React, { Component } from 'react';

import { IncludeItem } from './IncludeItem/IncludeItem.jsx';
import { stateToHTML } from 'draft-js-export-html';

import R from 'ramda';

export class ExportModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      includedFolders: [],
      isExporting: false,
    };

    this.changeCheck = this.changeCheck.bind(this);
    this.exportFile = this.exportFile.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({
      includedFolders: R.map(function(obj) {
        return {
          isCheck: false,
          ...obj,
        };
      }, props.includedFolders),
    });
  }
  changeCheck(id, e) {
    const {
      includedFolders,
    } = this.state;

    const re = includedFolders.map(obj => {
      if (obj._id === id) {
        return {
          ...obj,
          isCheck: e.target.checked,
        };
      }
      return obj;
    });

    this.setState({
      includedFolders: re,
    });
  }
  exportFile() {
    const {
      includedFolders,
    } = this.state;

    const {
      showError,

      intl,
    } = this.props;

    const ids = includedFolders.filter(obj => obj.isCheck).map(obj => obj._id);

    this.setState({
      isExporting: true,
    });

    Meteor.call('exportFolder', {
      ids,
    }, (err, data) => {


      if (err) {
        console.error(err);
        showError(
          intl.messages['exportModal.fail'],
          err.reason
        );
        this.setState({
          isExporting: false,
        });
        return;
      }

      let html = '';

      if (data.length > 0) {
        const content = {
          entityMap: {},
          blocks: R.flatten(data),
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
            <script type="text/javascript">
              window.print();
            </script>

          </body>
        </html>
      `;

      const uri = `data:text/html;charset=utf-8,${encodeURIComponent(normalizeHTML)}`;

      this.setState({
        isExporting: false,
      });

      window.open(uri);
    });
  }
  render() {
    const {
      isShowExportModal,
      hideExportModal,
    } = this.props;

    const {
      includedFolders,
      isExporting,
    } = this.state;

    return (
      <Modal
        show={isShowExportModal}
        onHide={hideExportModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="fa fa-download"></i>
              <span>Export</span>
            </h4>
          </div>
          <div className="modal-body">
            <div className="export-content">
              <table className="table table-striped">
                <thead>
                  <th>
                    <span>Include</span>
                  </th>
                  <th>
                    <span>Title</span>
                  </th>
                </thead>
                <tbody>
                {
                  includedFolders.map(obj => {
                    return (<IncludeItem
                      key={obj._id}
                      {...this.props}
                      {...obj}
                      changeCheck={this.changeCheck}
                    />);
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-default btn-close"
              onClick={hideExportModal}
            >
              <i className="fa fa-times"></i>
              <span>Close</span>
            </button>
            <button
              className="btn btn-primary btn-confirm"
              onClick={this.exportFile}
              disabled={isExporting}
            >
              <i className="fa fa-download"></i>
              <span>Export</span>
            </button>
          </div>
        </div>
      </Modal>

    );
  }
}
