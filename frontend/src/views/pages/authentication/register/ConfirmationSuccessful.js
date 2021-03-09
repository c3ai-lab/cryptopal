import React from 'react';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import { history } from '../../../../history';
import confirmImg from '../../../../assets/img/pages/graphic-4.png';

class ConfirmationSuccessful extends React.Component {
  render() {
    return (
      <Row className="m-0">
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              <img
                src={confirmImg}
                alt="ConfirmImg"
                className="img-fluid align-self-center"
              />
              <h1 className="font-large-2 my-1">
                Email confirmation successful!
              </h1>
              <p className="pt-2 mb-0">
                The email confirmation was successful. You are now ready to use
                Cryptopal - your payment provider for cryptocurrency.
                <br></br>
                We hope you enjoy our service and are looking forward for your
                feedback.
              </p>
              <p className="pb-2 mt-2">Your Cryptopal-Team</p>
              <Button.Ripple
                tag="a"
                href="/"
                color="primary"
                size="lg"
                className="mt-2"
                outline>
                Back to Home
              </Button.Ripple>
              <Button.Ripple
                onClick={() => history.push('/login')}
                color="primary"
                size="lg"
                className="mt-2 ml-4">
                To Login
              </Button.Ripple>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default ConfirmationSuccessful;
