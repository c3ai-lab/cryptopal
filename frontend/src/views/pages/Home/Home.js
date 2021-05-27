import React from 'react';
import { Row, Col } from 'reactstrap';
import HomeMain from './HomeMain';
import '../../../assets/scss/pages/knowledge-base.scss';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <HomeMain />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Home;
