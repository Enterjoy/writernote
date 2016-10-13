import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export class Synopsis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      synopsis: '',
    };

    this.updateSynopsis = this.updateSynopsis.bind(this);
    this.changeSynopsis = this.changeSynopsis.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({
      synopsis: props.focusFolder && props.focusFolder.synopsis,
    });
  }
  reset(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      synopsis: this.props.focusFolder && this.props.focusFolder.synopsis,
    });
  }
  changeSynopsis(e) {
    this.setState({
      synopsis: e.target.value,
    });
  }
  updateSynopsis(e) {
    e.preventDefault();

    const {
      focusFolder,
      intl,
    } = this.props;

    Meteor.call('updateFolderSynopsis', {
      _id: focusFolder._id,
      synopsis: e.target.synopsis.value,
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
  render() {
    const {
      focusFile,
    } = this.props;

    if (focusFile) {
      // return <div className="synopsis-block part">file right side bar</div>;
      return null;
    }

    return (
      <div className="synopsis-block part">
        <h4 className="title">
          <i className="fa fa-caret-down" aria-hidden="true"></i>
          <FormattedMessage
            id="novelDetail.synopsis"
            defaultMessage="novelDetail.synopsis"
          />
        </h4>
        <div className="content">
          <form onSubmit={this.updateSynopsis}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                placeholder=""
                name="synopsis"
                value={this.state.synopsis}
                onChange={this.changeSynopsis}
              ></textarea>
            </div>
            <div className="form-group">
              <button
                type="reset"
                className="btn btn-default btn-reset"
                onClick={this.reset}
              >
                <FormattedMessage
                  id="novelDetail.reset"
                  defaultMessage="novelDetail.reset"
                />
              </button>
              <button
                className="btn btn-primary btn-submit"
                type="submit"
              >
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
