import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../../history';
import { DropdownMenu, DropdownItem } from 'reactstrap';
import * as Icon from 'react-feather';
import { logout } from '../../../redux/actions/auth/authActions';

class NavbarUser extends React.Component {
  onLogout = () => {
    this.props.logout();
    history.push('/');
  };

  render() {
    return (
      <DropdownMenu right>
        <DropdownItem tag="a" onClick={() => history.push('/account-settings')}>
          <Icon.Settings size={14} className="mr-50" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        <DropdownItem tag="a" href="#">
          <Icon.Mail size={14} className="mr-50" />
          <span className="align-middle">My Inbox</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag="a" href="#" onClick={() => this.onLogout()}>
          <Icon.Power size={14} className="mr-50" />
          <span className="align-middle">Log Out</span>
        </DropdownItem>
      </DropdownMenu>
    );
  }
}

export default connect(null, { logout })(NavbarUser);
