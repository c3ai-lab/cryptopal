import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label,
  Alert
} from 'reactstrap';
import fgImg from '../../../assets/img/pages/forgot-password.png';
import { history } from '../../../history';
import '../../../assets/scss/pages/authentication.scss';
import Axios from 'axios';

class ForgotPassword extends React.Component {
  state = {
    email: '',
    family_name: '',
    feedback: { type: 'success', message: null }
  };

  onSubmit(e) {
    e.preventDefault();
    const { email, family_name } = this.state;
    Axios.post(process.env.REACT_APP_SERVER_API + '/auth/recover-password', {
      email,
      family_name
    })
      .then((res) => {
        console.log(res);
        this.setState({
          feedback: {
            type: 'success',
            message: res.data
          }
        });
      })
      .catch((err) => {
        this.setState({
          feedback: { type: 'danger', message: err.response.data }
        });
      });
  }

  render() {
    const { feedback } = this.state;
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center">
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center">
                <img src={fgImg} alt="fgImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 py-1">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">Recover your password</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    Please enter your email address and we'll send you
                    instructions on how to reset your password.
                  </p>
                  <CardBody className="pt-1 pb-0">
                    {feedback.message ? (
                      <Alert color={feedback.type}>{feedback.message}</Alert>
                    ) : null}
                    <Form>
                      <FormGroup className="form-label-group">
                        <Input
                          type="text"
                          placeholder="Email"
                          required
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                        />
                        <Label>Email</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group">
                        <Input
                          type="text"
                          placeholder="Family Name"
                          required
                          value={this.state.family_name}
                          onChange={(e) =>
                            this.setState({ family_name: e.target.value })
                          }
                        />
                        <Label>Family Name</Label>
                      </FormGroup>
                      <div className="float-md-left d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          outline
                          className="px-75 btn-block"
                          onClick={() => history.push('/login')}>
                          Back to Login
                        </Button.Ripple>
                      </div>
                      <div className="float-md-right d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          type="submit"
                          className="px-75 btn-block"
                          onClick={(e) => this.onSubmit(e)}>
                          Recover Password
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default ForgotPassword;
