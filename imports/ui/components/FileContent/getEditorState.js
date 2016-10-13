import {
  convertFromRaw,
  EditorState,
  SelectionState,
} from 'draft-js';

import { Random } from 'meteor/random';

import R from 'ramda';

import {
  createEditorState,
} from 'medium-draft';


export function getEditorState(blocks, ss) {
  let t = R.clone(ss);

  if (blocks.length === 0) {
    const key = Random.id(10);
    blocks.push({
      key: key,
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    });

    t = {
      anchorKey: key,
      anchorOffset: 0,
      focusKey: '2hrpk',
      focusOffset: 0,
      isBackward: false,
      hasFocus: true,
    };
  }

  const content = {
    entityMap: {},
    blocks,
  };

  const editorState = EditorState.push(
    createEditorState(),
    convertFromRaw(content)
  );

  if (t) {
    let es = editorState;
    const s = SelectionState.createEmpty(t.focusKey).merge(t);

    try {
      es = EditorState.acceptSelection(
        editorState,
        s.merge(t),
      );
    } catch (e) {
      console.error(e);
      es = editorState;
    } finally {
      return es;
    }
  }

  return editorState;
}
