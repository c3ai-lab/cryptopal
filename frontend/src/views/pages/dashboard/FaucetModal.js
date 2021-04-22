import React from 'react';
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Spinner
} from 'reactstrap';
import {
  getBalanceTokens,
  clearTransaction
} from '../../../redux/actions/wallet/walletActions';
import { clearErrors } from '../../../redux/actions/errors/errorActions';
import { connect } from 'react-redux';

class FaucetModal extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  state = { clicked: false, msg: null, success: false };

  onSubmit() {
    const value = document.getElementById('amount').value;
    this.props.getBalanceTokens(value);
    const msg = (
      <span>
        Loading. Please Wait.
        <Spinner />
      </span>
    );
    this.setState({
      clicked: true,
      success: true,
      msg
    });
  }

  // reset to default on close
  closeModal() {
    this.props.clearErrors();
    this.props.clearTransaction();
    this.props.toggleModal();
    this.setState({ clicked: false, msg: null, success: false });
  }

  // check for error
  componentDidUpdate(prevProps) {
    // set error message if exists
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ msg: error.msg, success: false, clicked: false });
    }

    // check if transaction object has changed
    const { transaction } = this.props.wallet;
    if (transaction.hash !== prevProps.wallet.transaction.hash) {
      if (!transaction.hash) {
        this.setState({ clicked: false, msg: null, success: false });
      } else {
        this.setState({ clicked: true, success: true });
      }
    }
  }

  render() {
    const wallet = this.props.wallet;
    const { clicked, msg, success } = this.state;
    return (
      <Modal
        isOpen={this.props.open}
        toggle={this.closeModal}
        className="modal-dialog-centered">
        <ModalHeader toggle={this.closeModal}>Balance Faucet</ModalHeader>
        <ModalBody>
          <p>
            This faucet is only for demo purposes. It is planed to implement an
            on ramping service for getting token as balance.
          </p>
          <p>Enter an amount (max 1000):</p>
          {clicked ? (
            success ? (
              <Alert>
                {wallet.transaction.hash
                  ? 'Successfull. Tx: ' + wallet.transaction.hash
                  : msg}
              </Alert>
            ) : (
              <Alert color="danger">{msg ? msg : ''}</Alert>
            )
          ) : null}
          <FormGroup>
            <Label for="amount">Amount:</Label>
            <Input type="number" id="amount" placeholder="Money amount" />
          </FormGroup>
          <p>Or send tokens to the following address</p>
          <p>{this.props.wallet.address}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.onSubmit}
            disabled={this.state.clicked}>
            Request Balance
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  error: state.error
});

export default connect(mapStateToProps, {
  getBalanceTokens,
  clearErrors,
  clearTransaction
})(FaucetModal);
