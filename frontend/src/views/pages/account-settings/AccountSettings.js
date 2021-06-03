// ================================================================================================
// 	File Name: account-settings.js
// 	Description:
//  This view renders a container with navigation bar for the different settings components like
//  user info, wallet info or changing password.
// ================================================================================================
import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody
} from 'reactstrap';
import classnames from 'classnames';
import { Settings, Lock, Info, UserCheck, CreditCard } from 'react-feather';
import { connect } from 'react-redux';
import GeneralTab from './General';
import ChangePassword from './ChangePassword';
import InfoTab from './Info';
import Breadcrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb';

import '../../../assets/scss/pages/account-settings.scss';
import ChangeRoleComp from './ChangeRoleComp';
import WalletInfo from './WalletInfo';

class AccountSettings extends React.Component {
  // keep track of the current width and selected tab
  state = {
    activeTab: '1',
    windowWidth: null
  };

  // toggle diffrent sections of settings
  toggle = (tab) => {
    this.setState({
      activeTab: tab
    });
  };

  // automatically update window width
  updateWidth = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  // adjust current with on mount
  componentDidMount() {
    if (window !== undefined) {
      this.updateWidth();
      window.addEventListener('resize', this.updateWidth);
    }
  }

  // conditionally render content component of selected tab and navbar
  render() {
    let { windowWidth } = this.state;
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Account Settings"
          breadCrumbActive="Account Settings"
        />
        <div
          className={`${
            windowWidth >= 769 ? 'nav-vertical' : 'account-setting-wrapper'
          }`}>
          {/* render navigation section of settings */}
          <Nav className="account-settings-tab nav-left mr-0 mr-sm-3" tabs>
            {/* nav link for general settings */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '1'
                })}
                onClick={() => {
                  this.toggle('1');
                }}>
                <Settings size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">
                  General
                </span>
              </NavLink>
            </NavItem>

            {/* nav link for user info settings */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '2'
                })}
                onClick={() => {
                  this.toggle('2');
                }}>
                <Info size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">
                  Info
                </span>
              </NavLink>
            </NavItem>

            {/* nav link for change password settings */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '3'
                })}
                onClick={() => {
                  this.toggle('3');
                }}>
                <Lock size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">
                  Change Password
                </span>
              </NavLink>
            </NavItem>

            {/* nav link for change role settings */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '4'
                })}
                onClick={() => {
                  this.toggle('4');
                }}>
                <UserCheck size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">
                  Change Role
                </span>
              </NavLink>
            </NavItem>

            {/* nav link for wallet info settings */}
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '5'
                })}
                onClick={() => {
                  this.toggle('5');
                }}>
                <CreditCard size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">
                  Wallet info
                </span>
              </NavLink>
            </NavItem>
          </Nav>

          {/* conditionally render content components */}
          <Card>
            <CardBody>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <GeneralTab />
                </TabPane>
                <TabPane tabId="2">
                  <InfoTab />
                </TabPane>
                <TabPane tabId="3">
                  <ChangePassword user={this.props.user} />
                </TabPane>
                <TabPane tabId="4">
                  <ChangeRoleComp />
                </TabPane>
                <TabPane tabId="5">
                  <WalletInfo
                    address={this.props.wallet.address}
                    balance={this.props.wallet.balance}
                  />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

// get data from redux
const mapStateToProps = (state) => ({
  user: state.auth.user,
  wallet: state.wallet
});

export default connect(mapStateToProps)(AccountSettings);
