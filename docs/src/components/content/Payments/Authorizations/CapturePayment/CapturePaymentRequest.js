import React from "react";
import Box from "../../../../layout/Box/Box";
import Parameter from "../../../../layout/Parameter/Parameter"
import "../../../../layout/General.css"

class CapturePaymentRequest extends React.Component {

    render () {
        const finalCaptureDescription = (
            <div>
                Indicates whether you can make additional captures against the authorized payment. 
                Set to true if you do not intend to capture additional payments against the authorization. 
                Set to <span className="highlight-code">false</span> if you intend to capture additional 
                payments against the authorization.
            </div>
        );
        return( 
        <Box>
            <Parameter 
            name="invoice_id" 
            type="string" 
            description="The API caller-provided external invoice number for this order. Appears in both the payer's transaction history and the emails that the payer receives." 
            maxLength="127"/>

            <hr></hr>
            <Parameter 
            name="note_to_payer" 
            type="string" 
            description="An informational note about this settlement. Appears in both the payer's transaction history and the emails that the payer receives." 
            maxLength="255"/>

            <hr></hr>
            <Parameter 
            name="amount" 
            type={<a href="/payments/custom-objects#money" target="_blank">object</a>}  
            description="The amount to capture. To capture a portion of the full authorized amount, specify an amount. If amount is not specified, the full authorized amount is captured. The amount must be a positive number and in the same currency as the authorization against which the payment is being captured." />

            <hr></hr>
            <Parameter 
            name="final_capture" 
            type="boolean" 
            description={finalCaptureDescription} /> 

            <hr></hr>
            <Parameter 
            name="payment_instructions" 
            type={<a href="/payments/custom-objects#payment_instruction" target="_blank">object</a>}  
            description="Any additional payment instructions for CryptoPal Commerce Platform customers. Enables features for the CryptoPal Commerce Platform, such as delayed disbursement and collection of a platform fee. Applies during order creation for captured payments or during capture of authorized payments." />    

            <hr></hr>
            <Parameter 
            name="soft_descriptor" 
            type="string" 
            description="The payment descriptor on the payer's account statement." 
            maxLength="22"/>
        </Box>
        );
    }
}

export default CapturePaymentRequest;