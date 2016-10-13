import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import React from 'react';

export const AlertModal = (props) => {
  const {
    isShowAlertModal,
    hideAlertModal,
  } = props;

  return (
    <Modal
      show={isShowAlertModal}
      onHide={hideAlertModal}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">
            <i className="fa fa-share-alt"></i>
            <FormattedMessage
              id="alertModal.h4"
              defaultMessage="alertModal.h4"
            />
          </h4>
        </div>
        <div className="modal-body">
          <div className="">
            <FormattedMessage
              id="alertModal.message"
              defaultMessage="alertModal.message"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-default btn-close"
            onClick={hideAlertModal}
          >
            <i className="fa fa-times"></i>
            <FormattedMessage
              id="alertModal.close"
              defaultMessage="alertModal.close"
            />
          </button>
        </div>
      </div>
    </Modal>

  );
};
