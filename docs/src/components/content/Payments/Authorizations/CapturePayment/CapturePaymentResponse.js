import React from "react";
import Box from "../../../../layout/Box/Box";
import Parameter from "../../../../layout/Parameter/Parameter"
import "../../../../layout/General.css"

class CapturePaymentResponse extends React.Component {

    render () {
        const statusDescription = (
            <div>
                The status for the captured payment.
                <br></br><br></br>
                The possible values are:
                <ul>
                    <li>
                        <span className="highlight-code">COMPLETED</span>. 
                        The funds for this captured payment were credited to the payee's CryptoPal account.
                    </li>
                    <li>
                        <span className="highlight-code">DECLINED</span>.  
                        The funds could not be captured.
                    </li>
                    <li>
                        <span className="highlight-code">PARTIALLY_REFUNDED</span>. 
                        An amount less than this captured payment's amount was partially refunded to the payer.
                    </li>
                    <li>
                        <span className="highlight-code">PENDING</span>. 
                        The funds for this captured payment was not yet credited to the payee's CryptoPal account. For more information, see status.details.
                    </li>
                    <li>
                        <span className="highlight-code">REFUNDED</span>. 
                        An amount greater than or equal to this captured payment's amount was refunded to the payer.
                    </li>
                </ul>
            </div>
        );

        const disbursementModeDescription = (
            <div>
                The funds that are held on behalf of the merchant.
                <br></br><br></br>
                The possible values are:
                <ul>
                    <li>
                        <span className="highlight-code">INSTANT</span>. 
                        The funds are released to the merchant immediately.
                    </li>
                    <li>
                        <span className="highlight-code">DELAYED</span>.  
                        The funds are held for a finite number of days. The actual duration depends on the 
                        region and type of integration. You can release the funds through a referenced payout. 
                        Otherwise, the funds disbursed automatically after the specified duration.
                    </li>
                </ul>
            </div>
        );

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
            name="status" 
            type="enum" 
            description={statusDescription} 
            readonly/>

            <hr></hr>
            <Parameter 
            name="status_details" 
            type={<a href="/payments/custom-objects#authorization_status_details" target="_blank">object</a>}  
            description="The details of the captured payment status.." 
            readonly/>  

            <hr></hr>
            <Parameter 
            name="id" 
            type="string" 
            description="The CryptoPal-generated ID for the captured payment." 
            readonly/>

            <hr></hr>
            <Parameter 
            name="amount" 
            type={<a href="/payments/custom-objects#money" target="_blank">object</a>}  
            description="The amount for this captured payment." 
            readonly/>  

            <hr></hr>
            <Parameter 
            name="invoice_id" 
            type="string" 
            description="The API caller-provided external invoice number for this order. Appears in both the payer's transaction history and the emails that the payer receives." 
            readonly/>

            <hr></hr>
            <Parameter 
            name="custom_id" 
            type="string" 
            description="The API caller-provided external ID. Used to reconcile API caller-initiated transactions with CryptoPal transactions. Appears in transaction and settlement reports." 
            maxLength="127"/>   

            <hr></hr>
            <Parameter 
            name="seller_protection" 
            type={<a href="/payments/custom-objects#seller_protection" target="_blank">object</a>}  
            description="The level of protection offered as defined by CryptoPal Seller Protection for Merchants." 
            readonly/>

            <hr></hr>
            <Parameter 
            name="final_capture" 
            type="boolean" 
            description={finalCaptureDescription} /> 

            <hr></hr>
            <Parameter 
            name="seller_receivable_breakdown" 
            type={<a href="/payments/custom-objects#seller_receivable_breakdown" target="_blank">object</a>}  
            description="The detailed breakdown of the capture activity."
            readonly/>

            <hr></hr>
            <Parameter 
            name="disbursement_mode" 
            type="enum" 
            description={disbursementModeDescription} />

            <hr></hr>
            <Parameter 
            name="links" 
            type={<p>array (contains the <a href="/payments/custom-objects#link" target="_blank">link</a> object)</p>}
            description='An array of related HATEOAS links.'
            readonly /> 

            <hr></hr>
            <Parameter 
            name="create_time" 
            type="string" 
            description="The date and time when the transaction occurred, in Internet date and time format."
            readonly/>
            
            <hr></hr>
            <Parameter 
            name="update_time" 
            type="string" 
            description="The date and time when the transaction was last updated, in Internet date and time format."
            readonly/> 
        </Box>
        );
    }
}

export default CapturePaymentResponse;