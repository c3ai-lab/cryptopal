import React from 'react';
import { Card, CardBody, Row, Col, Media, Table, Button } from 'reactstrap';
import Breadcrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb';
import logo from '../../../assets/img/logo/logo.png';
import { Mail, CreditCard, FileText, Download } from 'react-feather';

import '../../../assets/scss/pages/transaction.scss';

class Transaction extends React.Component {
  render() {
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
                      <p>001/2020</p>
                      <h6 className="mt-2">TRANSACTION DATE</h6>
                      <p>10 Dec 2018</p>
                    </div>
                  </Col>
                </Row>
                <Row className="pt-2">
                  <Col md="6" sm="12">
                    <h5>Sender</h5>
                    <div className="recipient-info">
                      <p>Peter Stark</p>
                    </div>
                    <div className="recipient-contact pb-2">
                      <p>
                        <Mail size={15} className="mr-50" />
                        peter@mail.com
                      </p>
                      <p>
                        <CreditCard size={15} className="mr-50" />
                        0x000098juijuiji
                      </p>
                    </div>
                  </Col>
                  <Col md="6" sm="12" className="text-right">
                    <h5>Recipient</h5>
                    <div className="recipient-info">
                      <p>Peter Stark</p>
                    </div>
                    <div className="recipient-contact pb-2">
                      <p>
                        <Mail size={15} className="mr-50" />
                        peter@mail.com
                      </p>
                      <p>
                        <CreditCard size={15} className="mr-50" />
                        0x000098juijuiji
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
                            <td>
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et dolore magna aliquyam erat, sed diam
                              voluptua. At vero eos et accusam et justo duo
                              dolores et ea rebum. Stet clita kasd gubergren, no
                              sea takimata sanctus est Lorem ipsum dolor sit
                              amet. Lorem ipsum dolor sit amet, consetetur
                              sadipscing elitr, sed diam nonumy eirmod tempor
                              invidunt ut labore et dolore magna aliquyam erat,
                              sed diam voluptua. At vero eos et accusam et justo
                              duo dolores et ea rebum. Stet clita kasd
                              gubergren, no sea takimata sanctus est Lorem ipsum
                              dolor sit amet.
                            </td>
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
                              <strong>30.00 USD</strong>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
                <div className="text-center pt-3 transaction-footer">
                  <a
                    href="https://kovan.etherscan.io/tx/0x72f36e77d50886125a03c4fbd1c8508b23ef70b124f21d72430dc0766ecdfe15"
                    target="_blank"
                    rel="noopener noreferrer">
                    Click here for the transaction details on the blockchain.
                  </a>
                  <p className="bank-details mb-0">
                    <span className="mr-4">
                      Transactionhash:
                      0xc7c3453ce78792b9eabd12f8e57d1c6a9ddec4245fca48d529f6a003586c6a97
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

export default Transaction;
