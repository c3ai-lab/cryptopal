// ================================================================================================
// 	File Name: AuthorizePayment.js
// 	Description:
//  This view shows a list of ordered products with prices. The user can authorize a payment for
//  this order or refuse it.
// ================================================================================================
import Axios from 'axios';
import React from 'react';
import { Button, Card, CardBody, Row, Col, Alert, Spinner } from 'reactstrap';
import { Check } from 'react-feather';
import { history } from '../../../history';

class CapturePayment extends React.Component {
  state = {
    loading: false,
    success: false,
    msg: null
  };

  // send capture request
  capturePayment(e) {
    e.preventDefault();
    this.setState({ loading: true });
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json',
        'cp-auth-token': this.props.token
      }
    };

    Axios.post(
      process.env.REACT_APP_SERVER_API +
        '/orders/' +
        this.props.orderId +
        '/capture',
      {},
      config
    )
      .then(() => {
        this.setState({ loading: false, success: true });
      })
      .catch((err) => {
        this.setState({ msg: err.message, loading: false });
      });
  }

  // render content for capture page conditionally
  render() {
    const payee = this.props.payee;
    // overview for confirmation
    let content = (
      <div>
        <div className="capture-area">
          <h3>Do you want to send</h3>
          <h1 className="capture-price">${this.props.price}</h1>
          <h3>to</h3>
          <h5>{payee.company}</h5>
          <h5>{payee.name}</h5>
          <h5>{payee.email_address}</h5>
        </div>
        <div className="d-flex justify-content-between">
          <Button.Ripple
            color="primary"
            outline
            onClick={() => history.goBack()}>
            Cancel
          </Button.Ripple>
          <Button.Ripple
            color="primary"
            onClick={(e) => this.capturePayment(e)}>
            Send
          </Button.Ripple>
        </div>
      </div>
    );

    // error feedback from server
    if (this.state.msg) {
      content = (
        <div>
          <Alert color="danger">
            Something went wrong. Please check your balance.
          </Alert>
          <div className="d-flex justify-content-between">
            <Button.Ripple
              color="primary"
              outline
              onClick={() => history.goBack()}>
              Back to shop
            </Button.Ripple>
            <Button.Ripple
              color="primary"
              onClick={() => history.push('/login')}>
              To Login
            </Button.Ripple>
          </div>
        </div>
      );
    }
    // success view
    else if (this.state.success) {
      content = (
        <div className="capture-area">
          <h3>Payment successfull</h3>
          <div className={'success-icon bg-success'}>
            <Check size={50} />
          </div>
          <Button.Ripple
            color="primary"
            outline
            onClick={() => history.goBack()}>
            Back to shop
          </Button.Ripple>
        </div>
      );
    }

    return (
      <Row className="m-0">
        <Col>
          <Card className="rounded-0 mb-0 px-2">
            <CardBody>
              <h4>Capture payment</h4>
              {this.state.loading ? (
                <div className="text-center">
                  <p>Processing the payment. Please wait.</p>
                  <Spinner color="primary" />
                </div>
              ) : (
                content
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default CapturePayment;
