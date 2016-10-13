import { createContainer } from 'meteor/react-meteor-data';
// import { SubsManager } from 'meteor/meteorhacks:subs-manager';

import { FileContent } from '../../components/FileContent/FileContent.jsx';

// import { Block } from '../../../api/Block/Block.js';

// import { getEditorState } from './getEditorState.js';

import R from 'ramda';

// const sub1 = new SubsManager();

const dict = new ReactiveDict('FileContent');

dict.setDefault({
  blocks: [],
});

// let selection = null;

export default createContainer((props) => {
  // const {
  //   isFile,
  //   fileId,
  // } = props;
  //
  // if (isFile) {
  //   Meteor.call(
  //     'getBlockByFileId',
  //     {fileId},
  //     (err, data) => {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //
  //       dict.set('blocks', data);
  //     }
  //   );
  // }
  //
  // const editorState = dict
  // .get('blocks')
  // .map((obj) => ({...obj.content}));

  return {
    // editorState: getEditorState(
    //   editorState,
    //   selection,
    // ),
    // setSelection(obj) {
    //   selection = R.clone(obj);
    // },
    // isSameBlock(key) {
    //   return selection && key === selection.getFocusKey();
    // }
  };
}, FileContent);
