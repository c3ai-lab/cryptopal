// ================================================================================================
// 	File Name: Transactions.js
// 	Description:
//  This view is a wrapper for the table displaying all loaded transactions in a table to the user.
//  It is shown in the transactions section. The table is configured in DataListConfiguration.js.
// ================================================================================================
import React from 'react';
import { Row, Col } from 'reactstrap';
import Breadcrumbs from '../../../../components/@vuexy/breadCrumbs/BreadCrumb';
import ThumbViewConfig from './DataListConfig';
class Transactions extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Transactions"
          breadCrumbActive="Transactions"
          parentPath="/transactions"
        />
        <Row>
          <Col sm="12">
            <ThumbViewConfig />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Transactions;
