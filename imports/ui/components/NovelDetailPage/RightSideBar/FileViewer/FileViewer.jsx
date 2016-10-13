import React, { Component } from 'react';

import { getEditorState } from './getEditorState.js';
import { FormattedMessage } from 'react-intl';

import 'draft-js/dist/Draft.css';

import {
  Editor,
  createEditorState,
} from 'medium-draft';

export class FileViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(),
      fileId: null,
    };

    this.fileChange = this.fileChange.bind(this);
  }

  componentWillReceiveProps(props) {
    const { fileId: oldFileId } = this.props;
    const { fileId: newFileId, isFile } = props;

    if (oldFileId !== newFileId && isFile) {
      this.setState({
        isLoading: true,
      });

    }
  }

  fileChange(e) {
    const value = e.target.value;

    if (value.length > 0) {
      Meteor.call(
        'getBlockByFileId', {
          fileId: value,
        }, (err, data) => {

          if (err) {
            console.error(err);
            return;
          }

          const editorState = data.map((obj) => ({...obj.content}));

          this.setState({
            editorState: getEditorState(editorState, null),
            fileId: value,
          });
        }
      );

      return;
    }

    this.setState({
      editorState: createEditorState(),
      fileId: null,
    });
  }

  render() {
    const {
      editorState,
      fileId,
    } = this.state;

    const {
      focusFile,
      settingFiles,
    } = this.props;

    if (!focusFile) {
      return null;
    }

    return (
      <div style={{
        position: 'relative',
        top: '50px',
        margin: '15px',
      }}
      >
        <div className="form-group">
          <label className="">
            <FormattedMessage
              id="fileViewer.label"
              defaultMessage="fileViewer.label"
            />
          </label>
          <select
            className="form-control"
            value={fileId}
            onChange={this.fileChange}
          >
            <option>
              <FormattedMessage
                id="fileViewer.none"
                defaultMessage="fileViewer.none"
              />
            </option>
            {
              settingFiles.map(obj => {
                return <option value={obj._id}>{obj.name}</option>;
              })
            }
          </select>
        </div>
        <div className="">
          <Editor
            ref="editor"
            editorState={editorState}
            editorEnabled={false}
            sideButtons={[]}
            placeholder={''}
          />
        </div>
      </div>
    );
  }
}
