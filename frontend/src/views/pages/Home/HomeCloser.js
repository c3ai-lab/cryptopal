import React from 'react';
import { Card, Button } from 'reactstrap';
import '../../../assets/scss/pages/home-base.scss';
import { history } from '../../../history';
import background from '../../../assets/img/custom/closing.jpg';

class HomeCloser extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <div className="home-closing">
            <img src={background} alt="Closer" className="closing-img" />
            <div className="closing-phrase">
              <h2>Start your future today!</h2>
              <Button.Ripple
                color="primary"
                onClick={() => history.push('/register')}>
                SIGN UP NOW
              </Button.Ripple>
            </div>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default HomeCloser;
