import React, { Component } from 'react';

import { Folder } from './Folder/Folder.jsx';
import { CreateItemModal } from './CreateItemModal/CreateItemModal.jsx';
import { DeleteItemModal } from './DeleteItemModal/DeleteItemModal.jsx';
import { RestoreItemModal } from './RestoreItemModal/RestoreItemModal.jsx';
import { EditItemModal } from './EditItemModal/EditItemModal.jsx';

export class LeftSideBar extends Component {
  renderFolder() {
    const {
      folders,
    } = this.props;

    return folders.map(f => {
      return <Folder key={f._id} {...f} {...this.props} />;
    });
  }
  render() {
    const {
      focusLevel,
      focusFolder,
      focusFile,
      toggleLeftSidebar,
      showCreateItemModal,
      showDeleteItemModal,
      showEditItemModal,
    } = this.props;

    const isFile = !!focusFile;

    let isShowCreateBtn = true;

    isShowCreateBtn = focusLevel < 2 && focusFolder.folderType !== 'trash';

    let isShowEditBtn = true;
    let isShowDeleteBtn = true;

    if (!isFile &&
      focusFolder &&
      (focusFolder.folderType === 'root' ||
      focusFolder.folderType === 'research' ||
      focusFolder.folderType === 'trash' ||
      focusFolder.folderType === 'template' ||
      focusFolder.folderType === 'settings')
    ) {
      isShowEditBtn = false;
      isShowDeleteBtn = false;
    }

    return (
      <div className="sidebar-left sidebar">
        <div className="header-block">
          <ul className="action">
            {
              isShowCreateBtn ?
              <li
                className="add-chapter"
              >
                <a onClick={showCreateItemModal}>
                  <i className="icon-document-add"></i>
                </a>
              </li> : ''
            }
            {
              isShowDeleteBtn ?
              <li className="remove-chapter">
                <a onClick={showDeleteItemModal}>
                  <i className="icon-bin"></i>
                </a>
              </li> : ''
            }
            {
              isShowEditBtn ?
              <li className="edit-chapter">
                <a onClick={showEditItemModal}>
                  <i className="fa fa-pencil-square-o"></i>
                </a>
              </li> : ''
            }
          </ul>

          <a
            className="hide-sidebar-left"
            onClick={toggleLeftSidebar}
          >
            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
          </a>
        </div>
        <div className="content-block">
          <div className="draft-block">
            {this.renderFolder()}
          </div>
        </div>

        <CreateItemModal {...this.props} />
        <DeleteItemModal {...this.props} />
        <RestoreItemModal {...this.props} />
        <EditItemModal {...this.props} />
      </div>
    );
  }
}
