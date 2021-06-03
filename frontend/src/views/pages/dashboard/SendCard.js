// ================================================================================================
// 	File Name: SendCard.js
// 	Description:
//  This component represents a section of the dashborad with a button to send a payment. It also
//  shows recent contact as avatars for a short link to send payments again.
// ================================================================================================
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Send } from 'react-feather';
import Avatar from '../../../components/@vuexy/avatar/AvatarComponent';
import { history } from '../../../history';

class SendCard extends React.Component {
  render() {
    // render an avatar with the credentials of the recent contacts
    const contacts = this.props.contacts;
    const contactList = [];
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const splitName = contact.name.split(' ');
      contactList.push(
        <Avatar
          className="mr-1"
          key={'transaction-item' + i}
          content={
            splitName[0].charAt(0).toUpperCase() +
            splitName[1].charAt(0).toUpperCase()
          }
          onClick={() => history.push('/send?address=' + contact.address)}
        />
      );
    }

    // render card with button and shortcuts avatar
    return (
      <Card className="send-card">
        <CardBody className="text-center">
          {/* send payment button links to send payment page*/}
          <div className="send-button" onClick={() => history.push('/send')}>
            <div className="avatar bg-primary shadow avatar-dashboard mt-0">
              <div className="avatar-content">
                <Send className="text-white" size={28} />
              </div>
            </div>
            <h5>Send</h5>
          </div>

          {/* list recent contacts - links to send payment page with contact information*/}
          <div className="text-center">
            <h3 className="mb-2">Send again</h3>
            {contactList.length !== 0 ? contactList : <p>No recent contacts</p>}
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default SendCard;
