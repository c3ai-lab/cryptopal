import React from "react";
import Box from "../../../../layout/Box/Box";
import Parameter from "../../../../layout/Parameter/Parameter"
import "../../../../layout/General.css"

class ShowDetailsResponse extends React.Component {

    render () {
        const statusDescription = (
            <div>
                The status for the authorized payment.
                <br></br><br></br>
                The possible values are:
                <ul>
                    <li>
                        <span className="highlight-code">CREATED</span>. 
                        The authorized payment is created. No captured payments have been made for this authorized payment.
                    </li>
                    <li>
                        <span className="highlight-code">CAPTURED</span>.  
                        The authorized payment has one or more captures against it. The sum of these captured payments is greater than the amount of the original authorized payment.
                    </li>
                    <li>
                        <span className="highlight-code">DENIED</span>. 
                        CryptoPal cannot authorize funds for this authorized payment.
                    </li>
                    <li>
                        <span className="highlight-code">EXPIRED</span>. 
                        The authorized payment has expired.
                    </li>
                    <li>
                        <span className="highlight-code">PARTIALLY_CAPTURED</span>. 
                        A captured payment was made for the authorized payment for an amount that is less than the amount of the original authorized payment.
                    </li>
                    <li>
                        <span className="highlight-code">PARTIALLY_CREATED</span>. 
                        The payment which was authorized for an amount that is less than the originally requested amount.
                    </li>
                    <li>
                        <span className="highlight-code">VOIDED</span>. 
                        The authorized payment was voided. No more captured payments can be made against this authorized payment.
                    </li>
                    <li>
                        <span className="highlight-code">PENDING</span>. 
                        The created authorization is in pending state. For more information, see <span className="highlight-code">status.details</span>.
                    </li>
                </ul>
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
            description="The details of the authorized order pending status." 
            readonly/>    

            <hr></hr>
            <Parameter 
            name="id" 
            type="string" 
            description="The CryptoPal-generated ID for the authorized payment." 
            readonly/>

            <hr></hr>
            <Parameter 
            name="amount" 
            type={<a href="/payments/custom-objects#money" target="_blank">object</a>}  
            description="The amount for this authorized payment." 
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
            name="expiration_time" 
            type="string" 
            description="The date and time when the authorized payment expires, in Internet date and time format."
            readonly
            minLength="20" 
            maxLength="64"
            pattern="^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"/>

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

export default ShowDetailsResponse;