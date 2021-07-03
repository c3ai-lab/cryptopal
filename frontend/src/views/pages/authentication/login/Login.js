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
  Label,
  Alert
} from 'reactstrap';
import { Mail, Lock } from 'react-feather';
import { history } from '../../../../history';

import loginImg from '../../../../assets/img/pages/login.png';
import '../../../../assets/scss/pages/authentication.scss';

import { connect } from 'react-redux';
import { login } from '../../../../redux/actions/auth/authActions';
import { clearErrors } from '../../../../redux/actions/errors/errorActions';

class Login extends React.Component {
  // keep track of entered credentials
  state = {
    email: 'lars.ra@web.de',
    password: 'lololo',
    msg: null
  };

  // send login request with redux actions
  onLogin(e) {
    e.preventDefault();

    const { email, password } = this.state;
    this.props.login({ email, password });
  }

  // check for login error
  componentDidUpdate(prevProps) {
    // set error message if exists
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ msg: error.msg });
    }

    // clear errors if log in was successful
    if (this.props.isAuthenticated) {
      if (error.status) this.props.clearErrors();
      history.push('/dashboard');
    }
  }

  // render login page with input fields for email and password
  render() {
    const { msg } = this.state;
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center">
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0">
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
                    <h4>Login</h4>
                    <p>Welcome back, please login to your account.</p>
                    {/* show server feddback on error */}
                    {msg ? <Alert color="danger">{msg}</Alert> : null}

                    {/* render form with input fields */}
                    <Form onSubmit={(e) => this.onLogin(e)}>
                      {/* email input field */}
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="email"
                          placeholder="Email"
                          required
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
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
                          value={this.state.password}
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

                      {/* forgot password link */}
                      <FormGroup className="d-flex justify-content-between align-items-center">
                        <div />
                        <div className="float-right">
                          <p
                            className="link"
                            onClick={() => history.push('/forgot-password')}>
                            Forgot Password?
                          </p>
                        </div>
                      </FormGroup>

                      {/* buttons to log in or switch to register page */}
                      <div className="d-flex justify-content-between">
                        <Button.Ripple
                          color="primary"
                          outline
                          onClick={() => history.push('/register')}>
                          Register
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
          </Card>
        </Col>
      </Row>
    );
  }
}

// connect with redux state
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
