import React from 'react';
import { Card, CardBody } from 'reactstrap';
import Swiper from 'react-id-swiper';
import img1 from '../../../assets/img/custom/slider1.jpg';
import img2 from '../../../assets/img/custom/slider2.jpg';
import img3 from '../../../assets/img/custom/slider3.jpg';
import img4 from '../../../assets/img/custom/slider4.jpg';
import img5 from '../../../assets/img/custom/slider5.jpg';

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
                <h2>Next Generation Payment Provider</h2>
                <h5>
                  Make your everyday life easier and safer by using CryptoPal as
                  your payment provider. CryptoPal offers simple access to
                  cryptocurrency and its use in everyday life.
                </h5>
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
              </div>
            </div>
            <div>
              <img
                src={img3}
                alt="swiper 3"
                className="img-fluid  img-relative"
              />
              <div className="slider-container slider-container-3">
                <h2>Smart Money Of Tomorrow</h2>
                <h5>
                  CryptoPal enables payments on online market places as well as
                  simple transfers to your friends and family with no
                  transaction fees.
                </h5>
              </div>
            </div>
            <div>
              <img
                src={img4}
                alt="swiper 4"
                className="img-fluid img-relative"
              />
              <div className="slider-container slider-container-4">
                <h2>Low Fees for Merchants</h2>
                <h5>
                  CryptoPal is easy to integrate into your online shop and
                  offers very low transaction fees to be the payment provider of
                  your choice.
                </h5>
              </div>
            </div>
            <div>
              <img src={img5} alt="swiper 5" className="img-fluid" />
              <div className="slider-container slider-container-4">
                <h2>Stable Value Bound to US Dollar</h2>
                <h5>
                  By using the xDai stable coin, CryptoPal provides stable value
                  transfer on blockchain technologie with instant transaction
                  execution.
                </h5>
              </div>
            </div>
          </Swiper>
        </CardBody>
      </Card>
    );
  }
}
export default AutoPlay;
