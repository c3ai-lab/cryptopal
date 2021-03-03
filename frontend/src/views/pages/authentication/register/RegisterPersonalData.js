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
    confirmedTerms: false
  };

  handleNext = (e) => {
    e.preventDefault();
    this.props.next('3', this.state);
  };

  render() {
    return (
      <Form action="/" onSubmit={this.handleNext}>
        <FormGroup className="form-label-group">
          <Input
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
