// ================================================================================================
// 	File Name: Transaction.js
// 	Description:
//  This view renders a receipt with given transaction data. The receipt shows the senders and
//  receivers emails, names and wallet addresses as well as the send amount and description.
//  A reference to the related blockchain transaction is shown as well.
// ================================================================================================
import React from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  Media,
  Table,
  Button,
  Spinner
} from 'reactstrap';
import Breadcrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb';
import logo from '../../../assets/img/logo/logo.png';
import { Mail, CreditCard, FileText, Download } from 'react-feather';
import { connect } from 'react-redux';
import {
  getTransaction,
  clearTransaction
} from '../../../redux/actions/wallet/walletActions';

import '../../../assets/scss/pages/transaction.scss';
import Axios from 'axios';

class Transaction extends React.Component {
  // properties of the transaction receipt
  state = {
    _id: '',
    sender: { name: '', email: '', address: '' },
    receiver: { name: '', email: '', address: '' },
    hash: '',
    description: '',
    date: '',
    value: '',
    items: null,
    company: '',
    loaded: false
  };

  // get transaction data by id from server
  componentDidMount() {
    const url = new URL(window.location.href);
    const txId = url.searchParams.get('tx');
    this.props.getTransaction(txId);
  }

  // read parameters from redux state
  componentDidUpdate(prevProps) {
    const { transaction } = this.props;
    if (transaction.hash !== prevProps.transaction.hash) {
      const date = new Date(transaction.date);
      const formatDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format;
      const formattedDate = formatDate(date);
      this.setState({ ...transaction, date: formattedDate, loaded: true });
    }

    // get order data if transaction belongs to an order
    if (transaction.description) {
      const words = transaction.description.split(' ');
      if (
        words[0] === 'Order' &&
        words[1] === 'number' &&
        this.state.items === null
      ) {
        this.getOrderDetails(words[2]);
      }
    }
  }

  // get order details by id
  getOrderDetails(orderId) {
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json',
        'cp-auth-token': this.props.token
      }
    };
    Axios.get(process.env.REACT_APP_SERVER_API + '/orders/' + orderId, config)
      .then((res) => {
        this.setState({
          items: res.data.purchase_units[0].items,
          company: res.data.payee.company
        });
      })
      .catch(() => {
        this.setState({ items: 'error' });
      });
  }

  // clear data on unmount
  componentWillUnmount() {
    this.props.clearTransaction();
  }

  render() {
    // fetch link to blockchain explorer by set network to reference transaction
    let explorerLink;
    switch (process.env.REACT_APP_NETWORK) {
      case 'SOKOL':
        explorerLink = process.env.REACT_APP_SOKOL_EXPLORER + this.state.hash;
        break;
      case 'KOVAN':
        explorerLink = process.env.REACT_APP_KOVAN_EXPLORER + this.state.hash;
        break;
      case 'CUSTOM':
        explorerLink = process.env.REACT_APP_CUSTOM_EXPLORER + this.state.hash;
        break;
      default:
        explorerLink = process.env.REACT_APP_SOKOL_EXPLORER + this.state.hash;
        break;
    }

    // create table with order details if transaction belongs to an order
    let items = [];
    if (this.state.items) {
      this.state.items.forEach((item) => {
        const itemData = (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td className="align-center">
              ${parseFloat(item.unit_amount.value).toFixed(2)}
            </td>
            <td className="align-center">
              {parseFloat(item.quantity).toFixed(2)}
            </td>
            <td className="align-center">
              $
              {(
                parseFloat(item.quantity) * parseFloat(item.unit_amount.value)
              ).toFixed(2)}
            </td>
          </tr>
        );
        items.push(itemData);
      });
    }

    if (this.state.loaded) {
      return (
        <React.Fragment>
          {/* header and controlling elements to print or download receipt */}
          <Breadcrumbs
            breadCrumbTitle="Transaction"
            breadCrumbParent="Transactions"
            breadCrumbActive="Transaction"
          />
          <Row>
            <Col
              className="d-flex flex-column flex-md-row justify-content-end transaction-header mb-1"
              md="7"
              sm="12">
              <Button
                className="mr-1 mb-md-0 mb-1"
                color="primary"
                onClick={() => window.print()}>
                <FileText size="15" />
                <span className="align-middle ml-50">Print</span>
              </Button>
              <Button.Ripple color="primary" outline>
                <Download size="15" />
                <span className="align-middle ml-50">Download</span>
              </Button.Ripple>
            </Col>

            {/* show document with receipt of transaction */}
            <Col className="transaction-wrapper" sm="12">
              <Card className="transaction-page">
                <CardBody>
                  <Row>
                    <Col md="6" sm="12" className="pt-1">
                      <Media className="pt-1">
                        <img src={logo} alt="logo" />
                      </Media>
                    </Col>

                    {/* general transaction data */}
                    <Col md="6" sm="12" className="text-right">
                      <h1>Transaction</h1>
                      <div className="transaction-details mt-2">
                        <h6>TRANSACTION NO.</h6>
                        <p>{this.state._id}</p>
                        <h6 className="mt-2">TRANSACTION DATE</h6>
                        <p>{this.state.date}</p>
                      </div>
                    </Col>
                  </Row>

                  {/* senders data */}
                  <Row className="pt-2">
                    <Col md="6" sm="12">
                      <h5>Sender</h5>
                      <div className="recipient-info">
                        <p>{this.state.sender.name}</p>
                      </div>
                      <div className="recipient-contact pb-2">
                        <p>
                          <Mail size={15} className="mr-50" />
                          {this.state.sender.email}
                        </p>
                        <p>
                          <CreditCard size={15} className="mr-50" />
                          {this.state.sender.address}
                        </p>
                      </div>
                    </Col>

                    {/* receiver data */}
                    <Col md="6" sm="12" className="text-right">
                      <h5>Recipient</h5>
                      <div className="recipient-info">
                        {this.state.company !== '' ? (
                          <p>{this.state.company}</p>
                        ) : null}
                        <p>{this.state.receiver.name}</p>
                      </div>
                      <div className="recipient-contact pb-2">
                        <p>
                          <Mail size={15} className="mr-50" />
                          {this.state.receiver.email}
                        </p>
                        <p>
                          <CreditCard size={15} className="mr-50" />
                          {this.state.receiver.address}
                        </p>
                      </div>
                    </Col>
                  </Row>

                  {/* description field */}
                  <div className="transaction-items-table pt-1">
                    <Row>
                      <Col sm="12">
                        <Table responsive borderless>
                          <thead>
                            <tr>
                              <th>TRANSACTION DESCRIPTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{this.state.description}</td>
                            </tr>
                          </tbody>
                        </Table>
                        {/* show order details if transaction belongs to an order */}
                        {this.state.items ? (
                          <Table responsive>
                            <thead>
                              <tr>
                                <th>ITEM</th>
                                <th className="align-center">PRICE</th>
                                <th className="align-center">QUANTITY</th>
                                <th className="align-center">TOTAL</th>
                              </tr>
                            </thead>
                            <tbody>{items}</tbody>
                          </Table>
                        ) : null}
                      </Col>
                    </Row>
                  </div>

                  {/* total amount send */}
                  <div className="transaction-total-table">
                    <Row>
                      <Col
                        sm={{ size: 3, offset: 8 }}
                        xs={{ size: 7, offset: 5 }}>
                        <Table responsive borderless>
                          <tbody>
                            <tr>
                              <th>TOTAL AMOUNT</th>
                              <td>
                                <strong>
                                  ${parseFloat(this.state.value).toFixed(2)}
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </div>

                  {/* reference to blockchain explorer showing transaction on chain */}
                  <div className="text-center pt-3 transaction-footer">
                    <a
                      href={explorerLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      Click here for the transaction details on the blockchain.
                    </a>
                    <p className="bank-details mb-0">
                      <span className="mr-4">
                        Transactionhash:
                        {this.state.hash}
                      </span>
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      );
    } else {
      return (
        <div className="spinner-container">
          <Spinner color="primary" size="lg" />
        </div>
      );
    }
  }
}

// get state from redux
const mapStateToProps = (state) => ({
  transaction: state.wallet.transaction,
  token: state.auth.token
});

export default connect(mapStateToProps, { getTransaction, clearTransaction })(
  Transaction
);
