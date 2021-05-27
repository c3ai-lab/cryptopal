import React from 'react';
import { Row, Col } from 'reactstrap';
import Autoplay from './Autoplay';
import 'swiper/css/swiper.css';
import '../../../assets/scss/plugins/extensions/swiper.scss';
class Swiper extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <Autoplay />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Swiper;
