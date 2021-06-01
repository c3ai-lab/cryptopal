import React from 'react';
import { Card, Button } from 'reactstrap';
import Arguments from './Arguments/Arguments';
import Swiper from './Swiper/Swiper';
import Technologies from './Technologies/Technologies';
import '../../../assets/scss/pages/home-base.scss';
import { history } from '../../../history';
import HomeCloser from './HomeCloser';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <div className="div-container">
            <Swiper />
            <div className="w-100 text-center">
              <Button.Ripple
                color="primary"
                className="mobile-button"
                onClick={() => history.push('/register')}>
                SIGN UP NOW
              </Button.Ripple>
            </div>
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
