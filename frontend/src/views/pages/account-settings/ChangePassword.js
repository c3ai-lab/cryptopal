import React from 'react';
import { Button, FormGroup, Row, Col } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
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
  onChangePassword(values) {
    const id = this.props.user._id;
    const { oldPassword, newPassword } = values;
    // send to server
  }

  render() {
    return (
      <React.Fragment>
        <Row className="pt-1">
          <Col sm="12">
            <h4>Change Password</h4>
            <p>
              Fill in the form to change your password. Do not forget to safe
              the changes.
            </p>
            <Formik
              initialValues={{
                oldpass: '',
                newpass: '',
                confirmpass: ''
              }}
              validationSchema={formSchema}
              onSubmit={(values) => this.onChangePassword(values)}>
              {({ errors, touched }) => (
                <Form>
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
