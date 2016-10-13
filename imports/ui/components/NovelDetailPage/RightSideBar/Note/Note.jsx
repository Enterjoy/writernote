import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: '',
    };

    this.updateNote = this.updateNote.bind(this);
    this.changeNote = this.changeNote.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({
      notes: props.focusFolder && props.focusFolder.notes,
    });
  }
  updateNote(e) {
    e.preventDefault();

    const {
      focusFolder,
      intl,
    } = this.props;

    Meteor.call('updateFolderNotes', {
      _id: focusFolder._id,
      notes: e.target.notes.value,
    }, (err) => {
      if (err) {
        console.error(err);
        this.props.showError(
          intl.messages.error,
          err.reason
        );
        return;
      }
      this.props.showSuccess(
        intl.messages.success,
        '',
      );
    });
  }
  changeNote(e) {
    this.setState({
      notes: e.target.value,
    });
  }
  reset(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      notes: this.props.focusFolder && this.props.focusFolder.notes,
    });
  }
  render() {
    const {
      focusFile,
    } = this.props;

    if (focusFile) {
      // return <div className="part">file right side bar</div>;
      return null;
    }

    return (
      <div className="document-notes-block part">
        <h4 className="title">
          <i className="fa fa-caret-down" aria-hidden="true"></i>
          <FormattedMessage
            id="novelDetail.documentNotes"
            defaultMessage="novelDetail.documentNotes"
          />
        </h4>
        <div className="content">
          <form onSubmit={this.updateNote}>
            <div className="form-group">
              <textarea
                value={this.state.notes}
                className="form-control"
                rows="5"
                placeholder=""
                name="notes"
                onChange={this.changeNote}
              ></textarea>
            </div>
            <div className="form-group">
              <button
                className="btn btn-default btn-reset"
                type="reset"
                onClick={this.reset}
              >
                <FormattedMessage
                  id="novelDetail.reset"
                  defaultMessage="novelDetail.reset"
                />
              </button>
              <button className="btn btn-primary btn-submit" type="submit">
                <FormattedMessage
                  id="novelDetail.update"
                  defaultMessage="novelDetail.update"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
