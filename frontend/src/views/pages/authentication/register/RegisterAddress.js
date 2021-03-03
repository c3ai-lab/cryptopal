import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { history } from '../../../../history';

class RegisterAddress extends React.Component {
  state = {
    streetAddress: '',
    postalCode: '',
    city: '',
    region: '',
    country: ''
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  };

  render() {
    return (
      <Form action="/" onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Street address"
            required
            value={this.state.streetAddress}
            onChange={(e) => this.setState({ streetAddress: e.target.value })}
          />
          <Label>Street address</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Postal code"
            required
            value={this.state.postalCode}
            onChange={(e) => this.setState({ postalCode: e.target.value })}
          />
          <Label>Postal code</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="City"
            required
            value={this.state.city}
            onChange={(e) => this.setState({ city: e.target.value })}
          />
          <Label>City</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Region"
            value={this.state.region}
            onChange={(e) => this.setState({ region: e.target.value })}
          />
          <Label>Region</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Country"
            required
            value={this.state.country}
            onChange={(e) => this.setState({ country: e.target.value })}
          />
          <Label>Country</Label>
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
            Register
          </Button.Ripple>
        </div>
      </Form>
    );
  }
}

export default RegisterAddress;
