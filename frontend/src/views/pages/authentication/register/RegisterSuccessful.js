import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import registerImage from '../../../../assets/img/pages/graphic-2.png';

class RegisterSuccessful extends React.Component {
  state = {
    disabled: false
  };
  resendConfirmation() {
    axios.get(
      `${process.env.REACT_APP_SERVER_API}/auth/resend-confirmation/${this.props.user.email}`
    );
    this.setState({ disabled: true });
    setTimeout(() => this.setState({ disabled: false }), 2 * 60 * 1000);
  }
  render() {
    return (
      <Row className="m-0">
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              <img
                src={registerImage}
                alt="RegisterImg"
                className="img-fluid align-self-center"
              />
              <h1 className="font-large-2 my-1">Confirm your email address!</h1>
              <p className="pt-2 mb-0">
                We received your registration request and send you an email with
                a confirmation link. You need to confirm your email address by
                visiting the link. <br></br>You are not able to use Cryptopals
                service without confirming your email address. <br></br>
                <br></br>If You haven't received an email after 5 minutes,
                please click the button below.
              </p>
              <Button.Ripple
                disabled={this.state.disabled}
                color="primary"
                size="lg"
                className="mt-2"
                onClick={() => this.resendConfirmation()}>
                Resend email
              </Button.Ripple>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(RegisterSuccessful);
