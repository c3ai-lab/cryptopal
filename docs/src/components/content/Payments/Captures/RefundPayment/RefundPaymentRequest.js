import React from "react";
import Box from "../../../../layout/Box/Box";
import Parameter from "../../../../layout/Parameter/Parameter"
import "../../../../layout/General.css"

class ShowDetailsResponse extends React.Component {

    render () {
        const amountDescription = (
            <div>
                The amount to refund. To refund a portion of the captured amount, specify an amount. If amount is not 
                specified, an amount equal to <span className="highlight-code">captured amount - previous refunds</span> is refunded. 
                The amount must be a positive number and in the same currency as the one in which the payment was captured.
            </div>
        );

        return( 
        <Box>
            <Parameter 
            name="amount" 
            type="object" 
            description={amountDescription}/>    

            <hr></hr>
            <Parameter 
            name="invoice_id" 
            type="string" 
            description="The API caller-provided external invoice number for this order. Appears in both the payer's transaction history and the emails that the payer receives." 
            maxLength="127" />  

            <hr></hr>
            <Parameter 
            name="note_to_payer" 
            type="string" 
            description="The reason for the refund. Appears in both the payer's transaction history and the emails that the payer receives." 
            maxLength="255"/>    
        </Box>
        );
    }
}

export default ShowDetailsResponse;