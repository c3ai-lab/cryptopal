import React from 'react';
import { CustomInput, Row, Col, Button } from 'reactstrap';

class Notification extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <h6 className="mb-1">Activity</h6>
            <CustomInput
              type="switch"
              className="d-block mb-2"
              id="form"
              name="form"
              inline>
              <span className="mb-0 switch-label">
                Email me when someone sends me a message
              </span>
            </CustomInput>
          </Col>
          <Col className="mt-1" sm="12">
            <h6 className="mb-1">Application</h6>
            <CustomInput
              type="switch"
              className="d-block mb-2"
              id="news"
              name="news"
              inline>
              <span className="mb-0 switch-label">News and announcements</span>
            </CustomInput>
          </Col>
          <Col sm="12">
            <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default Notification;
