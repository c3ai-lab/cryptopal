import React from 'react';
import { Button, FormGroup, Row, Col, Alert } from 'reactstrap';
import countries from 'countries-list';
import { connect } from 'react-redux';
import { updateUser } from '../../../redux/actions/auth/authActions';
import { clearErrors } from '../../../redux/actions/errors/errorActions';

import '../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
const formSchema = Yup.object().shape({
  street_address: Yup.string().required('Required').max(255, 'Too long'),
  postal_code: Yup.string().required('Required').max(255, 'Too long'),
  locality: Yup.string().required('Required').max(255, 'Too long'),
  region: Yup.string(),
  country: Yup.string().required('Required'),
  phone: Yup.string(),
  website: Yup.string()
});

class InfoTab extends React.Component {
  state = {
    feedback: { type: 'success', msg: null }
  };

  onChangesSubmit(values) {
    // send request to server
    const { website, phone, ...address } = values;
    const { given_name, family_name, emails, company } = this.props.user;

    const user = {
      website,
      phone,
      address,
      given_name,
      family_name,
      emails,
      company
    };

    // send request
    this.props.updateUser({
      user
    });
    this.setState({
      feedback: { type: 'success', msg: 'Successfully changed data.' }
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

  render() {
    // get current values and set as initial values
    const { address, phone, website } = this.props.user ? this.props.user : {};
    // get all countries from api and display them as options for selector
    const countryCodes = Object.keys(countries.countries);
    const countriesOptions = [];
    countryCodes.map((code) =>
      countriesOptions.push(
        <option key={code}>{countries.countries[code].name}</option>
      )
    );
    const feedback = this.state.feedback;
    return (
      <React.Fragment>
        <Row className="pt-1">
          <Col sm="12">
            <h4>Info</h4>
            <p>
              You can update your information by entering new values. Do not
              forget to safe your changes.
            </p>
            <Formik
              initialValues={{ ...address, phone, website }}
              validationSchema={formSchema}
              onSubmit={(values) => {
                this.onChangesSubmit(values);
              }}>
              {({ errors, touched }) => (
                <Form>
                  {feedback.msg ? (
                    <Alert color={feedback.type}>{feedback.msg}</Alert>
                  ) : null}
                  <FormGroup>
                    <Field
                      name="street_address"
                      id="street_address"
                      className={`form-control ${
                        errors.streetAddress &&
                        touched.streetAddress &&
                        'is-invalid'
                      }`}
                      placeholder="Street address"
                    />
                    {errors.streetAddress && touched.streetAddress ? (
                      <div className="text-danger">{errors.streetAddress}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="postal_code"
                      placeholder="Postal Code"
                      id="postal_code"
                      className={`form-control ${
                        errors.postalCode && touched.postalCode && 'is-invalid'
                      }`}
                    />
                    {errors.postalCode && touched.postalCode ? (
                      <div className="text-danger">{errors.postalCode}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="locality"
                      id="locality"
                      className={`form-control ${
                        errors.locality && touched.locality && 'is-invalid'
                      }`}
                      placeholder="Locality"
                    />
                    {errors.locality && touched.locality ? (
                      <div className="text-danger">{errors.locality}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="region"
                      id="region"
                      className={`form-control ${
                        errors.region && touched.region && 'is-invalid'
                      }`}
                      placeholder="Region"
                    />
                    {errors.region && touched.region ? (
                      <div className="text-danger">{errors.region}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="country"
                      id="country"
                      as="select"
                      className={`form-control ${
                        errors.country && touched.country && 'is-invalid'
                      }`}
                      placeholder="Country">
                      {countriesOptions}
                    </Field>
                    {errors.country && touched.country ? (
                      <div className="text-danger">{errors.country}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="phone"
                      id="phone"
                      className={`form-control ${
                        errors.phone && touched.phone && 'is-invalid'
                      }`}
                      placeholder="Phone"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="text-danger">{errors.phone}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="website"
                      id="website"
                      className={`form-control ${
                        errors.website && touched.website && 'is-invalid'
                      }`}
                      placeholder="Website"
                    />
                    {errors.website && touched.website ? (
                      <div className="text-danger">{errors.website}</div>
                    ) : null}
                  </FormGroup>
                  <div className="d-flex justify-content-start flex-wrap">
                    <Button.Ripple
                      className="mr-1 mb-1"
                      color="primary"
                      type="submit">
                      Save Changes
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
const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.error
});

export default connect(mapStateToProps, { updateUser, clearErrors })(InfoTab);
