import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Spinner,
  Label
} from 'reactstrap';

class SendPaymentModal extends React.Component {
  render() {
    return (
      <Modal
        isOpen={this.props.open}
        toggle={this.props.toggleModal}
        className="modal-dialog-centered">
        <ModalHeader toggle={this.props.toggleModal}>Payment sent</ModalHeader>
        <ModalBody>
          <Alert>Your payment was initiated successfully!</Alert>
          {this.props.txHash ? (
            <div>
              <Label for="payment-tx-status">Status:</Label>
              <p id="payment-tx-status">{this.props.status}</p>
              <Label for="payment-tx-hash">Transaction:</Label>
              <p id="payment-tx-hash">{this.props.txHash}</p>
            </div>
          ) : (
            <div className="text-center">
              <p>Loading transaction details</p>
              <Spinner color="primary" />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" outline onClick={this.props.toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SendPaymentModal;
