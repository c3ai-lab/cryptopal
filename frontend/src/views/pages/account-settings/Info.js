import React from 'react';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

import 'flatpickr/dist/themes/light.css';
import '../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss';

class InfoTab extends React.Component {
  state = {
    dob: new Date()
  };

  handleDob = (date) => {
    this.setState({
      dob: date
    });
  };
  render() {
    return (
      <React.Fragment>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="streetaddress">Street Address</Label>
                <Input
                  type="text"
                  name="streetaddress"
                  id="streetaddress"
                  required
                  placeholder="Streetaddress"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="postalcode">Postal Code</Label>
                <Input
                  type="text"
                  name="postalcode"
                  id="postalcode"
                  required
                  placeholder="Postal Code"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="locality">Locality</Label>
                <Input
                  type="text"
                  name="locality"
                  id="locality"
                  required
                  placeholder="Locality"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="region">Region</Label>
                <Input
                  type="text"
                  name="region"
                  id="region"
                  placeholder="Region"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="country">Country</Label>
                <Input type="select" name="country" id="country">
                  <option>US</option>
                  <option>UK</option>
                  <option>France</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="number">Phone Number</Label>
                <Input
                  type="number"
                  name="number"
                  id="number"
                  placeholder="Phone Number"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="url">Website URL</Label>
                <Input
                  type="url"
                  name="url"
                  id="url"
                  placeholder="Website URL"
                />
              </FormGroup>
            </Col>
            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple className="mr-50" type="submit" color="primary">
                Save Changes
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}
export default InfoTab;
