// ================================================================================================
// 	File Name: Checkout.js
// 	Description:
//  This component handles checkout requests from third party provider (i.e. Woocommerce shops).
//  The user has to login, authorize the payment for a specific order and capture the payment.
//  The three views for this steps are rendered conditionally.
// ================================================================================================
import React from 'react';
import { Card, Row, Col, Alert } from 'reactstrap';

import '../../../assets/scss/pages/authentication.scss';

import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth/authActions';
import { clearErrors } from '../../../redux/actions/errors/errorActions';
import Axios from 'axios';
import CheckoutLogin from './CheckoutLogin';
import AuthorizePayment from './AuthorizePayment';

class Checkout extends React.Component {
  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
  }
  // keep track of entered credentials
  state = {
    msg: null,
    authorizedPayment: false,
    orderId: null,
    redirectId: null
  };

  // send login request with redux actions
  onLogin(e, email, password) {
    e.preventDefault();
    this.props.login({ email, password });
  }

  // authorize payment for given order
  onAuthorizePayment(e, orderId) {
    e.preventDefault();
    Axios.post();
    this.setState({ authorizedPayment: true });
  }

  // get params from link
  componentDidMount() {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('cporder');
    const redirectId = url.searchParams.get('wporder');
    this.setState({ orderId, redirectId });
  }

  // check for login error
  componentDidUpdate(prevProps) {
    // set error message if exists
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ msg: error.msg });
    }

    // clear errors if log in was successful
    if (this.props.isAuthenticated && error.status) {
      this.props.clearErrors();
    }
  }

  // render login page with input fields for email and password
  render() {
    const { msg } = this.state;

    // render content conditionally
    let content = <CheckoutLogin onLogin={this.onLogin} />;
    if (this.props.isAuthenticated) {
      content = (
        <AuthorizePayment
          token={this.props.token}
          orderId={this.state.orderId}
          onAuthorize={this.props.onAuthorize}
        />
      );
      if (this.state.authorizedPayment) {
        content = <h1>Authorized</h1>;
      }
    }
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center">
          <Card className="login-card rounded-0 mb-0">
            {/* show server feddback on error */}
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            {content}
          </Card>
        </Col>
      </Row>
    );
  }
}

// connect with redux state
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Checkout);
