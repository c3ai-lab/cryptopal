import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Alert
} from 'reactstrap';
import classnames from 'classnames';
import RegisterCredentials from './RegisterCredentials';
import RegisterPersonalData from './RegisterPersonalData';
import RegisterAddress from './RegisterAddress';
import registerImg from '../../../../assets/img/pages/register.jpg';
import '../../../../assets/scss/pages/authentication.scss';

import { connect } from 'react-redux';
import { register } from '../../../../redux/actions/auth/authActions';
import { clearErrors } from '../../../../redux/actions/errors/errorActions';

class Register extends React.Component {
  state = {
    activeTab: '1',
    registerData: {},
    msg: null
  };

  // switch the tabs with registration details
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  // navigate to next form tab
  nextForm = (nextTab, data) => {
    if (nextTab === '0') {
      this.setState({ msg: data.msg });
    } else {
      this.setState((prevState) => ({
        registerData: { ...prevState.registerData, ...data },
        activeTab: nextTab,
        msg: null
      }));
    }
  };

  // send register data to server by calling action
  onRegister = (data) => {
    const sendData = { ...this.state.registerData, ...data };
    this.props.register(sendData);
  };

  // check for login error
  componentDidUpdate(prevProps) {
    // set error message if exists
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ msg: error.msg });
    }

    // clear errors if log in was successful
    if (this.props.isAuthenticated) {
      this.props.clearErrors();
    }
  }

  render() {
    const { msg } = this.state;
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
                className="d-lg-block d-none text-center align-self-center px-1 py-0">
                <img className="mr-1" src={registerImg} alt="registerImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 p-2">
                  <CardHeader className="pb-1 pt-50">
                    <CardTitle>
                      <h4 className="mb-0">Create Account</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title mb-0">
                    Fill the below form to create a new account.
                  </p>
                  {msg ? <Alert color="danger">{msg}</Alert> : null}
                  <Nav tabs className="px-2">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === '1'
                        })}
                        onClick={() => {
                          this.toggle('1');
                        }}>
                        Credentials
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === '2'
                        })}
                        disabled={this.state.activeTab < 2}
                        onClick={() => {
                          this.toggle('2');
                        }}>
                        Personal
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === '3'
                        })}
                        disabled={this.state.activeTab < 3}
                        onClick={() => {
                          this.toggle('3');
                        }}>
                        Contacts
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <CardBody className="pt-1 pb-50">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <RegisterCredentials next={this.nextForm} />
                      </TabPane>
                      <TabPane tabId="2">
                        <RegisterPersonalData next={this.nextForm} />
                      </TabPane>
                      <TabPane tabId="3">
                        <RegisterAddress register={this.onRegister} />
                      </TabPane>
                    </TabContent>
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
