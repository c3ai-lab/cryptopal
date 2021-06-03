// ================================================================================================
// 	File Name: RegisterAddress.js
// 	Description:
//  This component represents the input field for all data belonging to the users address. This
//  includes street address, postal code, locality, region and country.
// ================================================================================================
import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { history } from '../../../../history';
import countries from 'countries-list';

class RegisterAddress extends React.Component {
  // keep track of entered values
  state = {
    street_address: '',
    postal_code: '',
    locality: '',
    region: '',
    country: ''
  };

  // call register function to switch to next tab
  handleRegister = (e) => {
    e.preventDefault();
    this.props.register({ address: this.state });
  };

  render() {
    // create option dropdown for all countries
    const countryCodes = Object.keys(countries.countries);
    const countriesOptions = [];
    countryCodes.map((code) =>
      countriesOptions.push(
        <option key={code}>{countries.countries[code].name}</option>
      )
    );

    // render form with all needed input fields
    return (
      <Form action="/" onSubmit={this.handleRegister}>
        {/* street address input field */}
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

        {/* postal code input field */}
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

        {/* locality input field */}
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

        {/* region input field */}
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Region"
            value={this.state.region}
            onChange={(e) => this.setState({ region: e.target.value })}
          />
          <Label>Region</Label>
        </FormGroup>

        {/* country input field with option dropdown*/}
        <FormGroup className="form-label-group">
          <Input
            type="select"
            onChange={(e) => this.setState({ country: e.target.value })}>
            {countriesOptions}
          </Input>
          <Label>Country</Label>
        </FormGroup>

        {/* action buttons */}
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
