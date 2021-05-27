import React from 'react';
import { Card, CardBody, Row, Col, Media, Table, Button } from 'reactstrap';
import Breadcrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb';
import logo from '../../../assets/img/logo/logo.png';
import { Mail, CreditCard, FileText, Download } from 'react-feather';
import { connect } from 'react-redux';
import {
  getTransaction,
  clearTransaction
} from '../../../redux/actions/wallet/walletActions';

import '../../../assets/scss/pages/transaction.scss';

class Transaction extends React.Component {
  state = {
    _id: '',
    sender: { name: '', email: '', address: '' },
    receiver: { name: '', email: '', address: '' },
    hash: '',
    description: '',
    date: '',
    value: ''
  };

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
      this.setState({ ...transaction, date: formattedDate });
    }
  }

  componentWillUnmount() {
    this.props.clearTransaction();
  }

  render() {
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
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Transaction"
          breadCrumbParent="Transactions"
          breadCrumbActive="Transaction"
        />
        <Row>
          <Col className="mb-1 transaction-header" md="5" sm="12"></Col>
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
          <Col className="transaction-wrapper" sm="12">
            <Card className="transaction-page">
              <CardBody>
                <Row>
                  <Col md="6" sm="12" className="pt-1">
                    <Media className="pt-1">
                      <img src={logo} alt="logo" />
                    </Media>
                  </Col>
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
                  <Col md="6" sm="12" className="text-right">
                    <h5>Recipient</h5>
                    <div className="recipient-info">
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
                    </Col>
                  </Row>
                </div>
                <div className="transaction-total-table">
                  <Row>
                    <Col
                      sm={{ size: 7, offset: 5 }}
                      xs={{ size: 7, offset: 5 }}>
                      <Table responsive borderless>
                        <tbody>
                          <tr>
                            <th>TOTAL AMOUNT</th>
                            <td>
                              <strong>{this.state.value} USD</strong>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
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
  }
}
const mapStateToProps = (state) => ({
  transaction: state.wallet.transaction
});

export default connect(mapStateToProps, { getTransaction, clearTransaction })(
  Transaction
);
