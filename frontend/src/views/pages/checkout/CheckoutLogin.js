// ================================================================================================
// 	File Name: Login.js
// 	Description:
//  This view shows a simple login form with feedback and sends a request with redux actions.
// ================================================================================================
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import { Mail, Lock } from 'react-feather';
import { history } from '../../../history';

import '../../../assets/scss/pages/authentication.scss';

class CheckoutLogin extends React.Component {
  // keep track of entered credentials
  state = {
    email: '',
    password: ''
  };

  // render login page with input fields for email and password
  render() {
    const { email, password } = this.state;
    return (
      <Row className="m-0">
        <Col>
          <Card className="rounded-0 mb-0 px-2">
            <CardBody>
              <h4>Login</h4>
              <p>Welcome back. Login to proceed checkout.</p>

              {/* render form with input fields */}
              <Form onSubmit={(e) => this.props.onLogin(e, email, password)}>
                {/* email input field */}
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  <div className="form-control-position">
                    <Mail size={15} />
                  </div>
                  <Label>Email</Label>
                </FormGroup>

                {/* password input field */}
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    minLength="6"
                    required
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <div className="form-control-position">
                    <Lock size={15} />
                  </div>
                  <Label>Password</Label>
                </FormGroup>

                {/* buttons to log in or switch to register page */}
                <div className="d-flex justify-content-between">
                  <Button.Ripple
                    color="primary"
                    outline
                    onClick={() => history.goBack()}>
                    Cancel
                  </Button.Ripple>
                  <Button.Ripple color="primary" type="submit">
                    Login
                  </Button.Ripple>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default CheckoutLogin;
