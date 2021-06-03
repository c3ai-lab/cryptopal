// ================================================================================================
// 	File Name: DetailsCard.js
// 	Description:
//  This component represents a section of the dashborad with the current users balance and a
//  button to request some tokens.
// ================================================================================================
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

  // open modal to request some tokens on button click
  toggleModal() {
    this.setState((prevState) => ({
      openModal: !prevState.openModal
    }));
  }

  // render card with a field for the current balance an request button
  render() {
    return (
      <Card className="details-card">
        <CardBody>
          {/* display balance  */}
          <h2>CryptoPal Balance:</h2>
          <div className="balance text-center">
            <h1>{this.props.balance} $</h1>
            <p>available</p>

            {/* request button */}
            <div className="d-inline-block mr-1 mb-1">
              <Button.Ripple color="primary" outline onClick={this.toggleModal}>
                Get Balance
              </Button.Ripple>
            </div>
          </div>

          {/* modal to reuest some tokens */}
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
