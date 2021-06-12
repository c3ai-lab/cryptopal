// ================================================================================================
// 	File Name: Swiper.js
// 	Description:
//  This component is a wrapper class for the swiper at the top of the landing page (home).
// ================================================================================================
import React from 'react';
import Autoplay from './Autoplay';
import 'swiper/css/swiper.css';
import '../../../../assets/scss/plugins/extensions/swiper.scss';
class Swiper extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Autoplay />
      </React.Fragment>
    );
  }
}

export default Swiper;
