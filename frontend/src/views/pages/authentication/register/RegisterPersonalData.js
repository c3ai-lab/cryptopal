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
  state = {
    givenName: '',
    familyName: '',
    company: '',
    website: '',
    confirmedTerms: false
  };

  // check if terms are accepted and send entered data to register component
  handleNext = (e) => {
    e.preventDefault();
    if (this.state.confirmedTerms) {
      const { givenName, familyName, company, website } = this.state;
      this.props.next('3', { givenName, familyName, company, website });
    } else {
      this.props.next('0', { msg: 'You need to accept terms!' });
    }
  };

  render() {
    return (
      <Form action="/" onSubmit={this.handleNext}>
        <FormGroup className="form-label-group">
          <Input
            autoFocus
            type="text"
            placeholder="Given Name"
            required
            value={this.state.givenName}
            onChange={(e) => this.setState({ givenName: e.target.value })}
          />
          <Label>Given name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Family name"
            required
            value={this.state.familyName}
            onChange={(e) => this.setState({ familyName: e.target.value })}
          />
          <Label>Family Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Company"
            value={this.state.company}
            onChange={(e) => this.setState({ company: e.target.value })}
          />
          <Label>Company</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Company Website"
            value={this.state.website}
            onChange={(e) => this.setState({ website: e.target.value })}
          />
          <Label>Company Website</Label>
        </FormGroup>
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
