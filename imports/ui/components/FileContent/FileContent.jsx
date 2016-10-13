/* eslint-disable*/

import React, { Component } from 'react';
import { getFocusBlock } from './getFocusBlock.js';
import { FormattedMessage } from 'react-intl';

import { stateToHTML } from 'draft-js-export-html';
import { getEditorState } from './getEditorState.js';

import {
  convertToRaw,
  convertFromRaw,
  EditorState,
} from 'draft-js';

import 'draft-js/dist/Draft.css';
import '../../../stylesheets/medium-draft.css';

import R from 'ramda';

import {
  Editor,
  createEditorState,
  ImageSideButton,
} from 'medium-draft';

export class FileContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(),
      isLoading: false,
      words: 0,
      characters: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    const {
      isFile,
      fileId,
    } = this.props;

    if (isFile) {
      this.setState({
        isLoading: true,
      });
      Meteor.call(
        'getBlockByFileId', {
          fileId: fileId,
        }, (err, data) => {
          this.setState({
            isLoading: false,
          });
          if (err) {
            console.error(err);
            return;
          }

          // dict.set('blocks', data);
          const editorState = data.map((obj) => ({...obj.content}));

          const str = editorState.reduce((acc, obj) => acc.concat(obj.text), '');

          const characters = str.length;
          const words = str.split(/\S+/g).length - 1;

          this.setState({
            editorState: getEditorState(editorState, null),
            characters,
            words,
          });
        }
      );
    }
  }

  componentWillReceiveProps(props) {
    const { fileId: oldFileId } = this.props;
    const { fileId: newFileId, isFile } = props;

    if (oldFileId !== newFileId && isFile) {
      this.setState({
        isLoading: true,
      });
      Meteor.call(
        'getBlockByFileId', {
          fileId: newFileId
        }, (err, data) => {
          this.setState({
            isLoading: false,
          });
          if (err) {
            console.error(err);
            return;
          }

          // dict.set('blocks', data);
          const editorState = data.map((obj) => ({...obj.content}));

          this.setState({
            editorState: getEditorState(editorState, null),
          });
        }
      );
    }
  }

  onChange(newState) {
    const str = convertToRaw(
      newState.getCurrentContent()
    ).blocks.reduce((acc, obj) => acc.concat(obj.text), '');

    const characters = str.length;
    const words = str.split(/\S+/g).length - 1;

    this.setState({
      editorState: newState,
      characters,
      words,
    });
  }

  save() {
    const {
      editorState,
      words,
      characters,
    } = this.state;

    const {
      fileId,

      showError,
      showSuccess,
      intl,
    } = this.props;

    const blocks = convertToRaw(editorState.getCurrentContent()).blocks.map((obj, i) => ({
        ...obj,
        index: i,
    }));

    Meteor.call('overrideBlocks', {
      blocks,
      fileId,
    }, (err) => {
      if (err) {
        console.error(err);
        showError(
          intl.messages['novelDetail.saveFail'],
          err.reason
        );
        return;
      }
      showSuccess(intl.messages['novelDetail.saveSuccess']);
    });
  }

  onBlur() {
    // XXX: should have a confirm modal
    this.save();
  }

  render() {
    const {
      editorState,
      isLoading,
      characters,
      words,
    } = this.state;

    return (
      <div style={{
        height: '100%',
        overflow: 'hidden',
      }}>
        <div className="editor-header">
          <FormattedMessage
            id="fileContent.title"
            defaultMessage="fileContent.title"
          />
          <button
            className="btn btn-primary btn-save"
            onClick={this.save}
          >
            <FormattedMessage
              id="fileContent.save"
              defaultMessage="fileContent.save"
            />
          </button>
        </div>
        <div
          className="editor-content"
          style={{
            height: 'calc(100% - 60px)',
            overflow: 'scroll',
          }}
        >
        {
          isLoading ?
          <div className="">
            <FormattedMessage
              id="fileContent.loading"
              defaultMessage="fileContent.loading"
            />
          </div> :
          <Editor
            ref="editor"
            editorState={editorState}
            editorEnabled={!isLoading}
            onChange={this.onChange}
            sideButtons={[]}
            onBlur={this.onBlur}
          />
        }
        </div>
        <div className="footer-block">
          <div className="words-count">
            <label>
              <FormattedMessage
                id="novelDetail.words"
                defaultMessage="novelDetail.words"
              />:
            </label>
            <span>{words}</span>
          </div>
          <div className="chars-count">
            <label>
              <FormattedMessage
                id="novelDetail.characters"
                defaultMessage="novelDetail.characters"
              />:
            </label>
            <span>{characters}</span>
          </div>
        </div>
      </div>
    );
  }
}
