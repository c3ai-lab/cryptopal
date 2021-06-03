// ================================================================================================
// 	File Name: WalletInfo.js
// 	Description:
//  This components shows users wallet address with a copy button and users balance.
// ================================================================================================
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Input,
  Label
} from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../assets/scss/plugins/extensions/toastr.scss';

class WalletInfo extends React.Component {
  // copies wallet address to clipboard on clicking button
  onCopy = () => {
    toast.success('Text Copied Successfully', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };

  // renders users wallet address with copy-button and balance
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>Wallet Info</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="wallet-info-address">
              <div>
                <Label for="address">Address</Label>
                <Input id="address" value={this.props.address} disabled />
              </div>
              <div className="copy-address-btn">
                <CopyToClipboard onCopy={this.onCopy} text={this.props.address}>
                  <Button.Ripple color="primary">Copy!</Button.Ripple>
                </CopyToClipboard>
                <ToastContainer />
              </div>
            </div>
            <div className="wallet-info-balance">
              <Label for="balance">Balance</Label>
              <p id="balance">{this.props.balance}$</p>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default WalletInfo;
