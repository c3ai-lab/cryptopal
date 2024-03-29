// ================================================================================================
// 	File Name: General.js
// 	Description:
//  This components represents a form for changing general user information. Field for changing
//  informations are given name, last name, email and company.
// ================================================================================================
import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateUser } from '../../../redux/actions/auth/authActions';
import { clearErrors } from '../../../redux/actions/errors/errorActions';

class General extends React.Component {
  // keep track of input data and server feedback
  state = {
    ...this.props.user,
    credentials: '',
    feedback: { type: 'success', msg: null }
  };

  // fetch credentials from redux state
  componentDidMount() {
    // get credentials of user to display as an avatar
    if (this.props.user) {
      const user = this.props.user;
      const credentials =
        user.given_name.charAt(0) + user.family_name.charAt(0);
      this.setState({ credentials: credentials.toUpperCase() });
    }
  }

  // send changing data to server and set its feedback
  onChangeSubmit(e) {
    e.preventDefault();
    // get change data from state
    const updateData = (({
      given_name,
      family_name,
      address,
      company,
      website,
      emails,
      phone
    }) => ({
      given_name,
      family_name,
      address,
      company,
      website,
      emails,
      phone
    }))(this.state);

    let message = 'Successfully changed data!';
    // check if email was changed
    if (updateData.emails[0].value !== this.props.user.emails[0].value) {
      message =
        'You need to confirm email change. We send you an email to your active address.';
    }
    // send update request
    this.props.updateUser({ user: updateData });
    this.setState({
      feedback: { type: 'success', msg: message }
    });
    // reset feedback message after 5 sec
    setTimeout(
      () =>
        this.setState({
          feedback: { msg: null }
        }),
      5000
    );
  }

  // check for request error
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({ ...this.props.user });
    }
    // set error message if exists
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ feedback: { type: 'danger', msg: error.msg } });
    }

    // clear errors if log in was successful
    if (this.props.isAuthenticated && error.status) {
      this.props.clearErrors();
    }
  }

  // renders a form with all general data of the user
  // (given name, last name, email and company)
  render() {
    const { feedback, ...user } = this.state;
    return (
      <React.Fragment>
        {feedback.msg ? (
          <Alert color={feedback.type}>{feedback.msg}</Alert>
        ) : null}
        <Form className="mt-2" onSubmit={(e) => this.onChangeSubmit(e)}>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="givenName">Given Name</Label>
                <Input
                  id="givenName"
                  value={user.given_name}
                  required
                  onChange={(e) =>
                    this.setState({ given_name: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="familyName">Family Name</Label>
                <Input
                  id="familyName"
                  value={user.family_name}
                  required
                  onChange={(e) =>
                    this.setState({ family_name: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  value={user.emails ? user.emails[0].value : ''}
                  required
                  onChange={(e) => {
                    const email = e.target.value;
                    this.setState((prevState) => ({
                      emails: [{ ...prevState.emails[0], value: email }]
                    }));
                  }}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="company">Company</Label>
                <Input
                  id="company"
                  value={user.company}
                  onChange={(e) => this.setState({ company: e.target.value })}
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
const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.error
});

export default connect(mapStateToProps, { updateUser, clearErrors })(General);
