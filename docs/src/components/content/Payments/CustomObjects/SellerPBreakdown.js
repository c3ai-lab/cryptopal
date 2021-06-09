import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class SellerPBreakdown extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="gross_amount" 
            type={<a href="#money">object</a>} 
            description="The amount that the payee refunded to the payer."
            readonly />

            <hr></hr>
            <Parameter 
            name="cryptopal_fee" 
            type={<a href="#money">object</a>} 
            description="The Application fee that was refunded to the payer. This fee might not match the CryptoPal fee that the payee paid when the payment was captured." 
            readonly />

            <hr></hr>
            <Parameter 
            name="net_amount" 
            type={<a href="#money">object</a>} 
            description="The net amount that the payee receives for this captured payment in their CryptoPal account. The net amount is computed as gross_amount minus the cryptopal_fee minus the platform_fees."
            readonly />
        
            <hr></hr>
            <Parameter 
            name="platform_fees" 
            type={<p>array (contains the <a href="#platform_fee">platform_fee</a> object)</p>} 
            description="An array of various fees, commissions, tips, or donations." />

            <hr></hr>
            <Parameter 
            name="total_refunded_amount" 
            type={<a href="#money">object</a>} 
            description="The total amount refunded from the original capture to date. For example, if a payer makes a $100 purchase and was refunded $20 a week ago and was refunded $30 in this refund, the gross_amount is $30 for this refund and the total_refunded_amount is $50." />
        
        </Box>
        );
    }
}

export default SellerPBreakdown;