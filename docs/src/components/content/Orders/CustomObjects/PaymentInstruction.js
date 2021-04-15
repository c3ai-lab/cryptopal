import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class PaymentInstruction extends React.Component {

    render () {
        const modeDescription = (
            <div>
                The funds that are held on behalf of the merchant.
                <br></br><br></br>
                The possible values are:
                <ul>
                    <li><span className="highlight-code">INSTANT</span>. The funds are released to the merchant immediately.</li>
                    <li><span className="highlight-code">DELAYED</span>. The funds are held for a finite number of days. The actual duration depends on the region and type of integration. You can release the funds through a referenced payout. Otherwise, the funds disbursed automatically after the specified duration.</li>
                </ul>
            </div>
        );
        return( 
        <Box>
            <Parameter 
            name="platform_fees" 
            type={<p>array (contains the <a href="#platform_fee">platform_fee</a> object)</p>} 
            description="An array of various fees, commissions, tips, or donations." />

            <hr></hr>
            <Parameter 
            name="disbursement_mode" 
            type="enum" 
            description={modeDescription}/>

        </Box>
        );
    }
}

export default PaymentInstruction;