import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class SellerBreakdown extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="gross_amount" 
            type={<a href="#money">object</a>} 
            description="The amount for this captured payment in the currency of the transaction."
            required />

            <hr></hr>
            <Parameter 
            name="cryptopal_fee" 
            type={<a href="#money">object</a>} 
            description="The applicable fee for this captured payment in the currency of the transaction." />

            <hr></hr>
            <Parameter 
            name="net_amount" 
            type={<a href="#money">object</a>} 
            description="The net amount that the payee receives for this captured payment in their CryptoPal account. The net amount is computed as gross_amount minus the CryptoPal_fee minus the platform_fees." />
        
            <hr></hr>
            <Parameter 
            name="receivable_amount" 
            type={<a href="#money">object</a>} 
            description="The net amount that is credited to the payee's CryptoPal account. Returned only when the currency of the captured payment is different from the currency of the CryptoPal account where the payee wants to credit the funds. The amount is computed as net_amount times exchange_rate." />
        
            <hr></hr>
            <Parameter 
            name="exchange_rate" 
            type={<a href="#money">object</a>} 
            description="The exchange rate that determines the amount that is credited to the payee's CryptoPal account. Returned when the currency of the captured payment is different from the currency of the CryptoPal account where the payee wants to credit the funds." />
        
            <hr></hr>
            <Parameter 
            name="platform_fees" 
            type={<p>array (contains the <a href="#platform_fee">platform_fee</a> object)</p>} 
            description="An array of various fees, commissions, tips, or donations." />
        </Box>
        );
    }
}

export default SellerBreakdown;