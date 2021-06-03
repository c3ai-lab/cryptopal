// ================================================================================================
// 	File Name: ChangePassword.js
// 	Description:
//  This component represents a form for changing password and uses data validation with formik.
// ================================================================================================
import React from 'react';
import axios from 'axios';
import { Button, FormGroup, Row, Col, Alert } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// form schema to validate input data of passwords
const formSchema = Yup.object().shape({
  oldpass: Yup.string()
    .required('Required')
    .min(6, 'Password must have at least 6 characters'),
  newpass: Yup.string()
    .required('Required')
    .min(6, 'Password must have at least 6 characters'),
  confirmpass: Yup.string()
    .oneOf([Yup.ref('newpass'), null], 'Passwords must match')
    .required('Required')
});

class ChangePassword extends React.Component {
  // state to keep track of feedback messages
  state = {
    type: '',
    message: null
  };

  // send http request to server with changing password data
  onChangePassword(values, resetValues) {
    const id = this.props.user._id;

    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Request body
    const body = JSON.stringify({
      id,
      old_password: values.oldpass,
      new_password: values.newpass
    });
    axios
      .post(
        process.env.REACT_APP_SERVER_API + '/auth/change-password',
        body,
        config
      )
      .then(() => {
        this.setState({
          type: 'success',
          message: 'Successfully changed password!'
        });
      })
      .catch((err) => {
        this.setState({ type: 'danger', message: err.response.data });
      });
    resetValues();
  }

  render() {
    const { type, message } = this.state;
    return (
      <React.Fragment>
        <Row className="pt-1">
          <Col sm="12">
            <h4>Change Password</h4>
            <p>
              Fill in the form to change your password. Do not forget to safe
              the changes.
            </p>

            {/* show feddback message from server */}
            {message ? <Alert color={type}>{message}</Alert> : null}

            {/* use formik to show input feedback with validation schema */}
            <Formik
              initialValues={{
                oldpass: '',
                newpass: '',
                confirmpass: ''
              }}
              validationSchema={formSchema}
              onSubmit={(values, functions) =>
                this.onChangePassword(values, functions.resetForm)
              }>
              {/* render form fields with input feedback*/}
              {({ errors, touched }) => (
                <Form>
                  {/* old password input field */}
                  <FormGroup>
                    <Field
                      name="oldpass"
                      id="oldpass"
                      type="password"
                      className={`form-control ${
                        errors.oldpass && touched.oldpass && 'is-invalid'
                      }`}
                      placeholder="Old Password"
                    />
                    {errors.oldpass && touched.oldpass ? (
                      <div className="text-danger">{errors.oldpass}</div>
                    ) : null}
                  </FormGroup>

                  {/* new password input field */}
                  <FormGroup>
                    <Field
                      name="newpass"
                      placeholder="New Password"
                      id="newpass"
                      type="password"
                      className={`form-control ${
                        errors.newpass && touched.newpass && 'is-invalid'
                      }`}
                    />
                    {errors.newpass && touched.newpass ? (
                      <div className="text-danger">{errors.newpass}</div>
                    ) : null}
                  </FormGroup>

                  {/* confirm password input field */}
                  <FormGroup>
                    <Field
                      name="confirmpass"
                      id="confirmpass"
                      type="password"
                      className={`form-control ${
                        errors.confirmpass &&
                        touched.confirmpass &&
                        'is-invalid'
                      }`}
                      placeholder="Confirm Password"
                    />
                    {errors.confirmpass && touched.confirmpass ? (
                      <div className="text-danger">{errors.confirmpass}</div>
                    ) : null}
                  </FormGroup>

                  {/* render buttons */}
                  <div className="d-flex justify-content-start flex-wrap">
                    <Button.Ripple
                      className="mr-1 mb-1"
                      color="primary"
                      type="submit">
                      Save Changes
                    </Button.Ripple>
                    <Button.Ripple
                      className="mb-1"
                      color="danger"
                      type="reset"
                      outline>
                      Clear
                    </Button.Ripple>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default ChangePassword;
