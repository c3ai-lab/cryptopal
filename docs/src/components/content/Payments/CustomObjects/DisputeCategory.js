import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class DisputeCategory extends React.Component {

    render () {
        const categoryDescription= (<div>
            The condition that is covered for the transaction.
            <br></br><br></br>
            Possible values are: 
            <ul>
                <li>
                    <span className="highlight-code">ITEM_NOT_RECEIVED</span> The payer paid for an item that they did not receive.
                </li>
                <li>
                    <span className="highlight-code">UNAUTHORIZED_TRANSACTION</span> The payer did not authorize the payment.
                </li>
            </ul>
        </div>);

        return( 
        <Box>
            <Parameter 
            name="dispute_category" 
            type="enum" 
            description={categoryDescription} />
        </Box>
        );
    }
}

export default DisputeCategory;