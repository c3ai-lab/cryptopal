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
import '../../../assets/scss/pages/checkout.scss';
import Axios from 'axios';

class AuthorizePayment extends React.Component {
  // safe order and error feedback
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
        this.setState({ order: res.data });
      })
      .catch((err) => {
        this.setState({ msg: err.message });
      });
  }

  // format date of order
  getDateFormated(date) {
    const formatDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format;
    return formatDate(date);
  }

  // render review of order with prices and payee info
  render() {
    // get all information about items from order
    const order = this.state.order;
    let info = null;
    let payee = null;
    let items = [];
    let totalPrice = '';
    if (order) {
      // order number and creation date
      info = (
        <tr>
          <td>
            Order: {this.props.orderId}
            <br />
            {this.getDateFormated(new Date(order.create_time))}
          </td>
        </tr>
      );

      // order payee data
      payee = (
        <tr>
          <td>
            {order.payee.company || ''}
            <br />
            {order.payee.name}
            <br />
            {order.payee.email_address}
          </td>
        </tr>
      );
      // order items with name, quantity and prices
      order.purchase_units[0].items.forEach((item) => {
        const element = (
          <tr className="item" key={item.name}>
            <td>{item.name}</td>

            <td>${parseFloat(item.unit_amount.value).toFixed(2)}</td>

            <td className="value-center">
              {parseFloat(item.quantity).toFixed(2)}
            </td>

            <td className="value-center">
              $
              {(
                parseFloat(item.quantity) * parseFloat(item.unit_amount.value)
              ).toFixed(2)}
            </td>
          </tr>
        );
        items.push(element);
      });

      // order total price
      totalPrice = parseFloat(order.purchase_units[0].amount.value).toFixed(2);
    }

    // create error message output if the order can not be found
    if (this.state.msg) {
      return (
        <div>
          <h1>Order cannot be found!</h1>
        </div>
      );
    } else if (order && order.status === 'COMPLETED') {
      return (
        <div>
          <h1>Order already completed!</h1>
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
                <div className="invoice-box">
                  <table cellPadding="0" cellSpacing="0">
                    <thead>
                      <tr className="top">
                        <td colSpan="4">
                          <table>
                            <tbody>{info}</tbody>
                          </table>
                        </td>
                      </tr>

                      <tr className="information">
                        <td colSpan="2">
                          <table>
                            <tbody>{payee}</tbody>
                          </table>
                        </td>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="heading">
                        <td>Item</td>

                        <td>Price</td>

                        <td>Quantity</td>

                        <td>Total</td>
                      </tr>
                      {items}
                    </tbody>
                  </table>
                  <p className="total">Total Price: $ {totalPrice}</p>
                </div>
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
                    onClick={(e) =>
                      this.props.onAuthorize(e, order.payee, totalPrice)
                    }>
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
