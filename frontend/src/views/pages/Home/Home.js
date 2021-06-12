// ================================================================================================
// 	File Name: Home.js
// 	Description:
//  This view represents the langing page ("/"). It is a wrapper for he swiper, argument section,
//  technologies section and the closing section.
// ================================================================================================
import React from 'react';
import { Card } from 'reactstrap';
import Arguments from './Arguments/Arguments';
import Swiper from './Swiper/Swiper';
import Technologies from './Technologies/Technologies';
import '../../../assets/scss/pages/home-base.scss';
import HomeCloser from './HomeCloser';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <div className="div-container">
            <Swiper />
            <Arguments />
            <Technologies />
            <HomeCloser />
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default Home;
