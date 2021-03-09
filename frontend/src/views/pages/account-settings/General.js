import React from 'react';
import {
  Button,
  Media,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Alert
} from 'reactstrap';
import img from '../../../assets/img/portrait/small/avatar-s-11.jpg';
import Avatar from '../../../components/@vuexy/avatar/AvatarComponent';
import { connect } from 'react-redux';
import { updateUser } from '../../../redux/actions/auth/authActions';
import { clearErrors } from '../../../redux/actions/errors/errorActions';

class General extends React.Component {
  state = {
    ...this.props.user,
    credentials: '',
    feedback: { type: 'success', msg: null }
  };

  componentDidMount() {
    // get credentials of user to display as an avatar
    if (this.props.user) {
      const user = this.props.user;
      const credentials =
        user.given_name.charAt(0) + user.family_name.charAt(0);
      this.setState({ credentials: credentials.toUpperCase() });
    }
  }

  onChangeSubmit(e) {
    e.preventDefault();
    // send change data request to server
    const { credentials, feedback, ...updateData } = this.state;
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

  // check for login error
  componentDidUpdate(prevProps) {
    if (prevProps.user != this.props.user) {
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

  render() {
    const { feedback, ...user } = this.state;
    return (
      <React.Fragment>
        <Media>
          <Media className="mr-1" left href="#">
            {/* images not supported yet - user.img is always false */}
            {user.img ? (
              <Media
                className="rounded-circle"
                object
                src={img}
                alt="User"
                height="64"
                width="64"
              />
            ) : (
              <Avatar
                className="mr-1"
                content={this.state.credentials}
                size="lg"
              />
            )}
          </Media>
          <Media className="mt-25" body>
            <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
              <Button.Ripple
                tag="label"
                className="mr-50 cursor-pointer"
                color="primary"
                outline>
                Upload Photo
                <Input type="file" name="file" id="uploadImg" hidden />
              </Button.Ripple>
              <Button.Ripple color="flat-danger">Remove</Button.Ripple>
            </div>
            <p className="text-muted mt-50">
              <small>Allowed JPG, GIF or PNG. Max size of 800kB</small>
            </p>
          </Media>
        </Media>
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
