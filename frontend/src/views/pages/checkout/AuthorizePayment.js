// ================================================================================================
// 	File Name: AuthorizePayment.js
// 	Description:
//  This view shows a list of ordered products with prices. The user can authorize a payment for
//  this order or refuse it.
// ================================================================================================
import React from 'react';
import { Button, Card, CardBody, Row, Col } from 'reactstrap';
import { history } from '../../../history';

import '../../../assets/scss/pages/authentication.scss';
import Axios from 'axios';

class AuthorizePayment extends React.Component {
  // keep track of entered credentials
  state = {
    order: null,
    msg: null
  };

  // get order from database
  componentDidMount() {
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json',
        'cp-auth-token': this.props.token
      }
    };

    Axios.get(
      process.env.REACT_APP_SERVER_API + '/orders/' + this.props.orderId,
      config
    )
      .then((res) => {
        console.log(res);
        this.setState({ order: res.data });
      })
      .catch((err) => {
        this.setState({ msg: err.message });
      });
  }

  // render login page with input fields for email and password
  render() {
    const order = this.state.order;
    let price = '';
    if (order) price = order.purchase_units[0].amount.value;

    if (this.state.msg) {
      return (
        <div>
          <h1>Order cannot be found!</h1>
        </div>
      );
    } else {
      return (
        <Row className="m-0">
          <Col>
            <Card className="rounded-0 mb-0 px-2">
              <CardBody>
                <h4>Authorize payment</h4>
                <p>Please check the order details and authorize payment.</p>
                <div>{price}</div>
                {/* buttons to log in or switch to register page */}
                <div className="d-flex justify-content-between">
                  <Button.Ripple
                    color="primary"
                    outline
                    onClick={() => history.goBack()}>
                    Cancel
                  </Button.Ripple>
                  <Button.Ripple
                    color="primary"
                    onClick={this.props.onAuthorize}>
                    Authorize
                  </Button.Ripple>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
    }
  }
}

export default AuthorizePayment;
