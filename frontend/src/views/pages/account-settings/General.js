import React from 'react';
import {
  Button,
  Media,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap';
import img from '../../../assets/img/portrait/small/avatar-s-11.jpg';
import Avatar from '../../../components/@vuexy/avatar/AvatarComponent';

class General extends React.Component {
  state = {
    ...this.props.user,
    credentials: ''
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
    console.log(this.state);
  }

  render() {
    const user = this.state;
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
                  onChange={(e) =>
                    this.setState((prevState) => ({
                      emails: [
                        { ...prevState.emails[0], value: e.target.value }
                      ]
                    }))
                  }
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
export default General;
