// ================================================================================================
// 	File Name: RegisterPersonalData.js
// 	Description:
//  This component shows input fields for the users personal data. Input fields are given name,
//  last name, company, website, phone number and confirm terms of condition.
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
import Checkbox from '../../../../components/@vuexy/checkbox/CheckboxesVuexy';
import { Check } from 'react-feather';
import { history } from '../../../../history';

class RegisterPersonalData extends React.Component {
  // keep track of input data
  state = {
    given_name: '',
    family_name: '',
    company: '',
    website: '',
    phone: '',
    confirmedTerms: false
  };

  // check if terms are accepted and send entered data to register component
  handleNext = (e) => {
    e.preventDefault();
    if (this.state.confirmedTerms) {
      const { given_name, family_name, company, website, phone } = this.state;
      this.props.next('3', {
        given_name,
        family_name,
        company,
        website,
        phone
      });
    } else {
      this.props.next('0', { msg: 'You need to accept terms!' });
    }
  };

  // show all input fields belonging to users personal data
  render() {
    return (
      <Form action="/" onSubmit={this.handleNext}>
        {/* given name input field */}
        <FormGroup className="form-label-group">
          <Input
            autoFocus
            type="text"
            placeholder="Given Name"
            required
            value={this.state.given_name}
            onChange={(e) => this.setState({ given_name: e.target.value })}
          />
          <Label>Given name</Label>
        </FormGroup>

        {/* last name input field */}
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Family name"
            required
            value={this.state.family_name}
            onChange={(e) => this.setState({ family_name: e.target.value })}
          />
          <Label>Family Name</Label>
        </FormGroup>

        {/* company input field */}
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Company"
            value={this.state.company}
            onChange={(e) => this.setState({ company: e.target.value })}
          />
          <Label>Company</Label>
        </FormGroup>

        {/* company website input field */}
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Company Website"
            value={this.state.website}
            onChange={(e) => this.setState({ website: e.target.value })}
          />
          <Label>Company Website</Label>
        </FormGroup>

        {/* phone number input field */}
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

        {/* accept terms of licence input field */}
        <FormGroup>
          <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label=" I accept the terms & conditions."
            onChange={() =>
              this.setState((prevState) => ({
                confirmedTerms: !prevState.confirmedTerms
              }))
            }
            checked={this.state.confirmedTerms}
            invalid={this.state.confirmedTerms}
          />
          <FormFeedback>You need to confirm Terms</FormFeedback>
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
            Next
          </Button.Ripple>
        </div>
      </Form>
    );
  }
}

export default RegisterPersonalData;
