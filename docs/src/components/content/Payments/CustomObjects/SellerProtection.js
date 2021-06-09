import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class SellerProtection extends React.Component {

    render () {
        const statusDescription= (<div>
            Indicates whether the transaction is eligible for seller protection. For information, see CryptoPal Seller Protection for Merchants.
            <br></br><br></br>
            Possible values are: 
            <ul>
                <li>
                    <span className="highlight-code">ELIGIBLE</span> Your CryptoPal balance remains intact if the customer claims 
                    that they did not receive an item or the account holder claims that they did not authorize the payment.
                </li>
                <li>
                    <span className="highlight-code">PARTIALLY_ELIGIBLE</span>  Your CryptoPal balance remains intact if the 
                    customer claims that they did not receive an item.
                </li>
                <li>
                    <span className="highlight-code">NOT_ELIGIBLE</span> This transaction is not eligible for seller protection.
                </li>
            </ul>
        </div>);

        return( 
        <Box>
            <Parameter 
            name="status" 
            type="enum" 
            description={statusDescription} 
            readonly />

            <hr></hr>
            <Parameter 
            name="dispute_categories" 
            type={<p>array (contains the <a href="#dispute_category" target="_blank">dispute_category</a> object)</p>}  
            description="An array of conditions that are covered for the transaction." 
            readonly />
        </Box>
        );
    }
}

export default SellerProtection;