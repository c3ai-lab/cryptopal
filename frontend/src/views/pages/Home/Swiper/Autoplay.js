import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { history } from '../../../../history';
import Swiper from 'react-id-swiper';
import img3 from '../../../../assets/img/custom/slider1.jpg';
import img2 from '../../../../assets/img/custom/slider2.jpg';
import img1 from '../../../../assets/img/custom/slider3.jpg';

const params = {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 50000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
};

class AutoPlay extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <Swiper {...params}>
            <div>
              <img
                src={img1}
                alt="swiper 1"
                className="img-fluid img-relative"
              />
              <div className="slider-container slider-container-1">
                <h2>Smart Money Of Tomorrow</h2>
                <h5>
                  CryptoPal enables payments on online market places as well as
                  simple transfers to your friends and family with no
                  transaction fees.
                </h5>
                <Button.Ripple
                  color="primary"
                  className="navbar-buttons"
                  onClick={() => history.push('/register')}>
                  SIGN UP
                </Button.Ripple>
              </div>
            </div>
            <div>
              <img
                src={img2}
                alt="swiper 2"
                className="img-fluid img-relative"
              />
              <div className="slider-container slider-container-2">
                <h2>Build on Blockchain Technology</h2>
                <h5>
                  CryptoPal is build on blockchain technologie to make your
                  payments as safe as possible with instant execution.
                </h5>
                <Button.Ripple
                  color="primary"
                  className="navbar-buttons"
                  onClick={() => history.push('/register')}>
                  SIGN UP
                </Button.Ripple>
              </div>
            </div>
            <div>
              <img
                src={img3}
                alt="swiper 3"
                className="img-fluid img-relative"
              />
              <div className="slider-container slider-container-3">
                <h2>Next Generation Payment Provider</h2>
                <h5>
                  Make your everyday life easier and safer by using CryptoPal as
                  your payment provider. CryptoPal offers simple access to
                  cryptocurrency and its use in everyday life.
                </h5>
                <Button.Ripple
                  color="primary"
                  className="navbar-buttons"
                  onClick={() => history.push('/register')}>
                  SIGN UP
                </Button.Ripple>
              </div>
            </div>
          </Swiper>
        </CardBody>
      </Card>
    );
  }
}
export default AutoPlay;
