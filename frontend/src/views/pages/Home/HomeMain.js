import React from 'react';
import HomeCards from './HomeCards';
import Swiper from './Swiper';

class HomeMain extends React.Component {
  render() {
    return (
      <div className="div-container">
        <Swiper />
        <HomeCards />
      </div>
    );
  }
}
export default HomeMain;
