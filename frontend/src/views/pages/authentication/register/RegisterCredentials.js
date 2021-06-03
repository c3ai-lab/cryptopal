// ================================================================================================
// 	File Name: RegisterCredentials.js
// 	Description:
//  This component shows input fields for the user credentials. This contains email, password and
//  password confirmation.
// ================================================================================================
import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback
} from 'reactstrap';
import { history } from '../../../../history';

class RegisterCredentials extends React.Component {
  // keep track of entered credentials
  state = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  // select next tab for registration navigation
  handleNext = (e) => {
    e.preventDefault();
    // check if password confimation is successful
    if (this.state.password === this.state.confirmPassword) {
      const { email, password } = this.state;
      this.props.next('2', { email, password });
    }
  };

  // render input fields for credentials
  render() {
    return (
      <Form action="/" onSubmit={this.handleNext}>
        {/* email input field */}
        <FormGroup className="form-label-group">
          <Input
            autoFocus
            type="email"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <Label>Email</Label>
        </FormGroup>

        {/* password input field */}
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Password"
            required
            minLength="6"
            valid={this.state.password.length > 5}
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <Label>Password</Label>
        </FormGroup>

        {/* password confirmation field */}
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            minLength="6"
            valid={
              this.state.password === this.state.confirmPassword &&
              this.state.password.length > 5
            }
            invalid={this.state.password !== this.state.confirmPassword}
            value={this.state.confirmPassword}
            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
          />
          <Label>Confirm Password</Label>
          <FormFeedback>Password does not match</FormFeedback>
        </FormGroup>

        {/* switch to log in page */}
        <div className="one-line">
          <p>Already signed up? </p>
          <p className="link" onClick={() => history.push('/login')}>
            Click here to log in!
          </p>
        </div>

        {/* action buttons */}
        <div className="d-flex justify-content-between clear-both">
          <Button.Ripple
            color="primary"
            outline
            onClick={() => {
              history.push('/');
            }}>
            Cancel
          </Button.Ripple>
          <Button.Ripple color="primary" type="submit">
            Next
          </Button.Ripple>
        </div>
      </Form>
    );
  }
}

export default RegisterCredentials;
