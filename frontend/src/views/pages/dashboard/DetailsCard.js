import { Button } from 'reactstrap';
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import FaucetModal from './FaucetModal';

class DetailsCard extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
  }

  state = {
    openModal: false
  };

  toggleModal() {
    this.setState((prevState) => ({
      openModal: !prevState.openModal
    }));
  }
  render() {
    return (
      <Card className="details-card">
        <CardBody>
          <h2>CryptoPal Balance:</h2>
          <div className="balance text-center">
            <h1>{this.props.balance} $</h1>
            <p>available</p>

            <div className="d-inline-block mr-1 mb-1">
              <Button.Ripple color="primary" outline onClick={this.toggleModal}>
                Get Balance
              </Button.Ripple>
            </div>
          </div>
          <FaucetModal
            open={this.state.openModal}
            toggleModal={this.toggleModal}
          />
        </CardBody>
      </Card>
    );
  }
}
export default DetailsCard;
