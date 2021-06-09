import React from "react";
import Box from "../../../../layout/Box/Box";
import Parameter from "../../../../layout/Parameter/Parameter"
import "../../../../layout/General.css"

class ShowDetailsResponse extends React.Component {

    render () {
        const statusDescription = (
            <div>
                The status of the refund.
                <br></br><br></br>
                The possible values are:
                <ul>
                    <li>
                        <span className="highlight-code">CANCELLED</span>. 
                        The refund was cancelled.
                    </li>
                    <li>
                        <span className="highlight-code">PENDING</span>.  
                        The refund is pending. For more information, see  <span className="highlight-code">status_details.reason</span>.
                    </li>
                    <li>
                        <span className="highlight-code">COMPLETED</span>. 
                        The funds for this transaction were debited to the customer's account.
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
            type="object" 
            description="The details of the refund status." 
            readonly/>    

            <hr></hr>
            <Parameter 
            name="id" 
            type="string" 
            description="The CryptoPal-generated ID for the refund." 
            readonly/>

            <hr></hr>
            <Parameter 
            name="amount" 
            type="object" 
            description="The amount that the payee refunded to the payer." 
            readonly/>    

            <hr></hr>
            <Parameter 
            name="invoice_id" 
            type="string" 
            description="The API caller-provided external invoice number for this order. Appears in both the payer's transaction history and the emails that the payer receives." 
            readonly/>  

            <hr></hr>
            <Parameter 
            name="note_to_payer" 
            type="string" 
            description="The reason for the refund. Appears in both the payer's transaction history and the emails that the payer receives." 
            maxLength="127"/>    

            <hr></hr>
            <Parameter 
            name="seller_receivable_breakdown" 
            type="object" 
            description="The detailed breakdown of the capture activity."
            readonly/>

            <hr></hr>
            <Parameter 
            name="links" 
            type="array (contains the link_description object)" 
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