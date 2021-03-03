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
  state = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleNext = (e) => {
    e.preventDefault();
    // check if password confimation is successful
    if (this.state.password === this.state.confirmPassword) {
      this.props.next('2', this.state);
    }
  };

  render() {
    return (
      <Form action="/" onSubmit={this.handleNext}>
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <Label>Email</Label>
        </FormGroup>
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
        <div className="d-flex justify-content-between">
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
