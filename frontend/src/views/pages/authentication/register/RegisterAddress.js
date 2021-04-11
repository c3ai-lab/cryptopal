import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { history } from '../../../../history';
import countries from 'countries-list';

class RegisterAddress extends React.Component {
  state = {
    street_address: '',
    postal_code: '',
    locality: '',
    region: '',
    country: ''
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.register({ address: this.state });
  };

  render() {
    const countryCodes = Object.keys(countries.countries);
    const countriesOptions = [];
    countryCodes.map((code) =>
      countriesOptions.push(
        <option key={code}>{countries.countries[code].name}</option>
      )
    );
    return (
      <Form action="/" onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
          <Input
            autoFocus
            type="text"
            placeholder="Street address"
            required
            value={this.state.street_address}
            onChange={(e) => this.setState({ street_address: e.target.value })}
          />
          <Label>Street address</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Postal code"
            required
            value={this.state.postal_code}
            onChange={(e) => this.setState({ postal_code: e.target.value })}
          />
          <Label>Postal code</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Locality"
            required
            value={this.state.locality}
            onChange={(e) => this.setState({ locality: e.target.value })}
          />
          <Label>Locality</Label>
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
            type="select"
            onChange={(e) => this.setState({ country: e.target.value })}>
            {countriesOptions}
          </Input>
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
