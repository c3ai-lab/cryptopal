import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { history } from '../../../../history';
import countries from 'countries-list';

class RegisterAddress extends React.Component {
  state = {
    streetAddress: '',
    postalCode: '',
    locality: '',
    region: '',
    country: '',
    phone: ''
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.register(this.state);
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
        <FormGroup className="form-label-group">
          <Input
            type="number"
            placeholder="Phone"
            maxLength="30"
            value={this.state.phone}
            onChange={(e) => this.setState({ phone: e.target.value })}
          />
          <Label>Phone</Label>
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
