import React from 'react';
import {
  Card,
  CardBody,
  Button,
  FormGroup,
  Label,
  Input,
  Spinner,
  Alert
} from 'reactstrap';
import { Search, CheckCircle, XCircle } from 'react-feather';
import Avatar from '../../../components/@vuexy/avatar/AvatarComponent';
import '../../../assets/scss/pages/send-tokens.scss';
import SendPaymentModal from './SendPaymentModal';
import {
  checkPaymentTransaction,
  clearTransaction,
  sendPayment
} from '../../../redux/actions/wallet/walletActions';
import { clearErrors } from '../../../redux/actions/errors/errorActions';
import { connect } from 'react-redux';
import { history } from '../../../history';

class SendTokens extends React.Component {
  constructor(props) {
    super(props);
    this.checkPayment = this.checkPayment.bind(this);
    this.cancelPayment = this.cancelPayment.bind(this);
    this.sendPayment = this.sendPayment.bind(this);
  }

  state = {
    loading: false,
    checked: false,
    sent: false,
    enteredReceiver: '',
    amount: undefined,
    description: '',
    receiver: null,
    err: null,
    foreignAddress: false,
    hash: undefined
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const address = urlParams.get('address');
    if (address) this.setState({ enteredReceiver: address });
  }

  // validate inputs and send check request to server
  checkPayment() {
    this.props.clearErrors();
    this.props.clearTransaction();
    // reset values
    this.setState({
      loading: true,
      err: null,
      foreignAddress: false,
      receiver: null
    });

    //validate inputs
    if (this.state.enteredReceiver === '') {
      this.setState({ err: 'Sender cannot be empty!', loading: false });
      return;
    } else if (!this.state.amount || this.state.amount < 1) {
      this.setState({ err: 'Amount must be at least 1$!', loading: false });
      return;
    }

    // send request
    this.props.checkPaymentTransaction(this.state.enteredReceiver);
  }

  // cancel already checked payment
  cancelPayment() {
    this.setState({ checked: false, receiver: null });
    this.props.clearTransaction();
  }

  // send payment request to server
  sendPayment() {
    this.props.clearTransaction();

    this.props.sendPayment(
      this.state.receiver.address,
      this.state.amount,
      this.state.description
    );

    this.setState({
      loading: false,
      checked: false,
      sent: true,
      enteredReceiver: '',
      amount: undefined,
      description: '',
      receiver: null,
      err: null,
      foreignAddress: false,
      hash: undefined
    });
  }

  // check for state updates
  componentDidUpdate(prevProps) {
    // set error message if exists
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ err: error.msg, loading: false });
    }

    // check if transaction object has changed
    const { transaction } = this.props.wallet;
    if (
      transaction.name !== prevProps.wallet.transaction.name ||
      transaction.foreign !== prevProps.wallet.transaction.foreign ||
      transaction.hash !== prevProps.wallet.transaction.hash
    ) {
      if (transaction.name) {
        this.setState({
          receiver: { name: transaction.name, address: transaction.address },
          checked: transaction.name ? true : false,
          loading: false
        });
      } else if (transaction.foreign) {
        this.setState({
          receiver: { address: this.state.enteredReceiver },
          foreignAddress: true,
          checked: transaction.foreign ? true : false,
          loading: false
        });
      } else if (transaction.hash) {
        this.setState({ hash: transaction.hash });
      }
    }
  }

  render() {
    // render feedback
    let feedback = <Alert>Receiver check successful</Alert>;
    if (this.state.err) {
      feedback = <Alert color="danger">{this.state.err}</Alert>;
    } else if (this.state.foreignAddress) {
      feedback = (
        <Alert color="warning">
          Receiving address is not a CryptoPal user. If the entered address is
          not correct, funds are lost forever. Double check the address!
        </Alert>
      );
    }

    // render contacts
    const contacts = this.props.wallet.contacts;
    const contactList = [];
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const splitName = contact.name.split(' ');
      contactList.push(
        <Avatar
          className="mr-1"
          key={'transaction-item' + i}
          content={
            splitName[0].charAt(0).toUpperCase() +
            splitName[1].charAt(0).toUpperCase()
          }
          onClick={() => this.setState({ enteredReceiver: contact.address })}
        />
      );
    }
    return (
      <div className="send-tokens-container">
        {/* render loading spinner */}
        {this.state.loading ? (
          <div className="spinner-container">
            <Spinner color="primary" size="lg" />
            <p className="text-primary ml-1 mt-1">Checking Payment...</p>
          </div>
        ) : null}

        {/* heading and feedback */}
        <Card className="send-tokens-card">
          <h2>Send Payment</h2>
          <CardBody className="text-center">
            {this.state.checked || this.state.err ? feedback : null}

            {/* input field for receiver */}
            <FormGroup>
              <Label for="receiver-input">Receiver email or address</Label>
              <Input
                type="text"
                value={this.state.enteredReceiver}
                disabled={this.state.checked}
                onChange={(e) =>
                  this.setState({ enteredReceiver: e.target.value })
                }
                id="receiver-input"
                placeholder="Receiver email or address"
              />
            </FormGroup>

            {/* input field for amount */}
            <FormGroup>
              <Label for="amount-input">Sending Amount</Label>
              <Input
                type="number"
                value={this.state.amount || ''}
                disabled={this.state.checked}
                onChange={(e) => this.setState({ amount: e.target.value })}
                id="amount-input"
                placeholder="Sending Amount"
              />
            </FormGroup>

            {/* input field for description */}
            <FormGroup>
              <Label for="description-input">Description</Label>
              <Input
                type="text"
                value={this.state.description || ''}
                disabled={this.state.checked}
                onChange={(e) => this.setState({ description: e.target.value })}
                id="description-input"
                placeholder="Description"
              />
            </FormGroup>

            {/* render receiver */}
            {this.state.receiver ? (
              <div>
                <h3>Receiver</h3>
                <Label for="receiver-name">Name</Label>
                <p id="receiver-name">{this.state.receiver.name}</p>
                <Label for="receiver-name">Address</Label>
                <p id="receiver-name">{this.state.receiver.address}</p>
              </div>
            ) : null}

            {/* render recent users */}
            {this.state.checked ? null : (
              <div>
                <h3 className="mb-2">Send again</h3>
                <div>
                  {contactList.length !== 0 ? (
                    contactList
                  ) : (
                    <p>No recent contacts</p>
                  )}
                </div>
              </div>
            )}
            <hr></hr>

            {/* render buttons */}
            {this.state.checked ? (
              <div className="payment-buttons-container">
                <Button.Ripple
                  color="danger"
                  outline
                  onClick={this.cancelPayment}>
                  <XCircle className="text-danger mr-1" size={20} />
                  Cancel
                </Button.Ripple>
                <Button.Ripple color="primary" onClick={this.sendPayment}>
                  <CheckCircle className="text-white mr-1" size={20} />
                  Send Payment
                </Button.Ripple>
              </div>
            ) : (
              <Button.Ripple color="primary" onClick={this.checkPayment}>
                <Search className="text-white mr-1" size={20} />
                Check Payment
              </Button.Ripple>
            )}
          </CardBody>
        </Card>

        {/* confirmation modal */}
        <SendPaymentModal
          open={this.state.sent}
          toggleModal={() => {
            history.push('/dashboard');
            this.setState({ sent: false });
          }}
          status="pending"
          txHash={this.state.hash}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  error: state.error
});

export default connect(mapStateToProps, {
  clearErrors,
  checkPaymentTransaction,
  sendPayment,
  clearTransaction
})(SendTokens);
