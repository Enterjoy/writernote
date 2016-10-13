import React, { Component } from 'react';
import { FlowRouter as FR } from 'meteor/kadira:flow-router';

export class NovelItem extends Component {
  constructor(props) {
    super(props);

    this.deleteBook = this.deleteBook.bind(this);
  }
  deleteBook(e) {
    // XXX: there should be a modal to confirm deleteion
    e.preventDefault();
    e.stopPropagation();
    const {
      showDeleteModal,
      setFocusDeleteId,
      book,
    } = this.props;

    const {
      _id,
    } = book;

    setFocusDeleteId(_id);
    showDeleteModal();
  }
  render() {
    const {
      book,
    } = this.props;

    const {
      _id,
      name,
      img,
      folderId,
    } = book;

    return (
      <div className="col-md-3 col-xs-6 col-sm-3">
        <a href={FR.path('NovelDetailPage', {
          bookId: _id,
        }, {
          folderId,
        })}
        >
          <div className="novel-item">
            <div className="mask-bg">
              <a onClick={this.deleteBook}>
                <i className="icon-bin"></i>
              </a>
            </div>
            <div className="image">
              <img src={img} />
            </div>
            <h4 className="novel-name">{name}</h4>
          </div>
        </a>
      </div>
    );
  }
}
