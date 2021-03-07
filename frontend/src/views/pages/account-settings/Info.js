import React from 'react';
import { Button, FormGroup, Row, Col } from 'reactstrap';
import countries from 'countries-list';

import '../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
const formSchema = Yup.object().shape({
  streetAddress: Yup.string().required('Required').max(255, 'Too long'),
  postalCode: Yup.string().required('Required').max(255, 'Too long'),
  locality: Yup.string().required('Required').max(255, 'Too long'),
  region: Yup.string(),
  country: Yup.string().required('Required'),
  phone: Yup.string(),
  website: Yup.string()
});

class InfoTab extends React.Component {
  state = {
    ...this.props.user
  };

  onChangesSubmit(values) {
    // send request to server
    console.log(values);
  }

  render() {
    const { address, phone, website } = this.props.user ? this.props.user : {};
    const countryCodes = Object.keys(countries.countries);
    const countriesOptions = [];
    countryCodes.map((code) =>
      countriesOptions.push(
        <option key={code}>{countries.countries[code].name}</option>
      )
    );
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
              onSubmit={(values) => this.onChangesSubmit(values)}>
              {({ errors, touched }) => (
                <Form>
                  <FormGroup>
                    <Field
                      name="streetAddress"
                      id="streetAddress"
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
                      name="postalCode"
                      placeholder="Postal Code"
                      id="postalCode"
                      type="postalCode"
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

      // <React.Fragment>
      //   <Form onSubmit={(e) => e.preventDefault()}>
      //     <Row>
      //       <Col sm="12">
      //         <FormGroup>
      //           <Label for="streetaddress">Street Address</Label>
      //           <Input
      //             type="text"
      //             name="streetaddress"
      //             id="streetaddress"
      //             required
      //             placeholder="Streetaddress"
      //           />
      //         </FormGroup>
      //       </Col>
      //       <Col sm="12">
      //         <FormGroup>
      //           <Label for="postalcode">Postal Code</Label>
      //           <Input
      //             type="text"
      //             name="postalcode"
      //             id="postalcode"
      //             required
      //             placeholder="Postal Code"
      //           />
      //         </FormGroup>
      //       </Col>
      //       <Col sm="12">
      //         <FormGroup>
      //           <Label for="locality">Locality</Label>
      //           <Input
      //             type="text"
      //             name="locality"
      //             id="locality"
      //             required
      //             placeholder="Locality"
      //           />
      //         </FormGroup>
      //       </Col>
      //       <Col sm="12">
      //         <FormGroup>
      //           <Label for="region">Region</Label>
      //           <Input
      //             type="text"
      //             name="region"
      //             id="region"
      //             placeholder="Region"
      //           />
      //         </FormGroup>
      //       </Col>
      //       <Col sm="12">
      //         <FormGroup>
      //           <Label for="country">Country</Label>
      //           <Input type="select" name="country" id="country">
      //             <option>US</option>
      //             <option>UK</option>
      //             <option>France</option>
      //           </Input>
      //         </FormGroup>
      //       </Col>
      //       <Col sm="12">
      //         <FormGroup>
      //           <Label for="number">Phone Number</Label>
      //           <Input
      //             type="number"
      //             name="number"
      //             id="number"
      //             placeholder="Phone Number"
      //           />
      //         </FormGroup>
      //       </Col>
      //       <Col sm="12">
      //         <FormGroup>
      //           <Label for="url">Website URL</Label>
      //           <Input
      //             type="url"
      //             name="url"
      //             id="url"
      //             placeholder="Website URL"
      //           />
      //         </FormGroup>
      //       </Col>
      //       <Col className="d-flex justify-content-start flex-wrap" sm="12">
      //         <Button.Ripple className="mr-50" type="submit" color="primary">
      //           Save Changes
      //         </Button.Ripple>
      //       </Col>
      //     </Row>
      //   </Form>
      // </React.Fragment>
    );
  }
}
export default InfoTab;
