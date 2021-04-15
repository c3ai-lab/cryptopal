import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class CreateOrderResponse extends React.Component {

    render () {
        const intentDescription = (
            <div>
                The intent to either capture payment immediately or authorize a payment for an order after order creation.
                <br></br><br></br>
                The possible values are:
                <ul>
                    <li>
                        <span className="highlight-code">CAPTURE</span>. 
                        The merchant intends to capture payment immediately after the customer makes a payment.
                    </li>
                    <li>
                        <span className="highlight-code">AUTHORIZE</span>.  
                        The merchant intends to authorize a payment and place funds on hold after the customer 
                        makes a payment. Authorized payments are best captured within three days of authorization 
                        but are available to capture for up to 29 days. After the three-day honor period, the 
                        original authorized payment expires and you must re-authorize the payment. You must make 
                        a separate request to capture payments on demand. This intent is not supported when you 
                        have more than one `purchase_unit` within your order.
                    </li>
                </ul>
            </div>
        );

        const statusDescription = (
            <div>
                The order status.
                <br></br><br></br>
                The possible values are:
                <ul>
                    <li>
                        <span className="highlight-code">CREATED</span>. 
                        The order was created with the specified context.
                    </li>
                    <li>
                        <span className="highlight-code">SAVED</span>.  
                        The order was saved and persisted. The order status continues to be in progress until 
                        a capture is made with  <span className="highlight-code">final_capture = true</span>
                         for all purchase units within the order.
                    </li>
                    <li>
                        <span className="highlight-code">APPROVED</span>. 
                        The customer approved the payment through the PayPal wallet or another form of guest 
                        or unbranded payment. For example, a card, bank account, or so on.
                    </li>
                    <li>
                        <span className="highlight-code">VOIDED</span>. 
                        All purchase units in the order are voided.
                    </li>
                    <li>
                        <span className="highlight-code">COMPLETED</span>. 
                        The payment was authorized or the authorized payment was captured for the order.
                    </li>
                    <li>
                        <span className="highlight-code">PAYER_ACTION_REQUIRED</span>. 
                        The order requires an action from the payer (e.g. 3DS authentication). Redirect the 
                        payer to the "rel":"payer-action" HATEOAS link returned as part of the response prior 
                        to authorizing or capturing the order.
                    </li>
                </ul>
            </div>
        );
        return( 
        <Box>
            <Parameter 
            name="create_time" 
            type="string" 
            description="The date and time when the transaction occurred, in Internet date and time format."
            readonly
            minLength="20" 
            maxLength="64"
            pattern="^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"/>
            
            <hr></hr>
            <Parameter 
            name="update_time" 
            type="string" 
            description="The date and time when the transaction was last updated, in Internet date and time format."
            readonly
            minLength="20" 
            maxLength="64"
            pattern="^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"/>

            <hr></hr>
            <Parameter 
            name="id" 
            type="string" 
            description="The ID of the order." 
            readonly/>

            <hr></hr>
            <Parameter 
            name="payment_source" 
            type="object" 
            description="The payment source used to fund the payment." />

            <hr></hr>
            <Parameter 
            name="intent" 
            type="enum" 
            description={intentDescription} />   

            <hr></hr>
            <Parameter 
            name="payer" 
            type="object" 
            description="The customer who approves and pays for the order. The customer is also known as the payer." />   

            <hr></hr>
            <Parameter 
            name="purchase_units" 
            type="array (contains the purchase_unit object)" 
            description="An array of purchase units. Each purchase unit establishes a contract between a customer and merchant. Each purchase unit represents either a full or partial order that the customer intends to purchase from the merchant."/>   

            <hr></hr>
            <Parameter 
            name="status" 
            type="enum" 
            description={statusDescription} 
            readonly
            minLength="1"
            maxLength="255"
            pattern="^[0-9A-Z_]+$"/>   

            <hr></hr>
            <Parameter 
            name="links" 
            type="array (contains the link_description object)" 
            description='An array of request-related HATEOAS links. To complete payer approval, use the approve link to redirect the payer. The API caller has 3 hours (default setting, this which can be changed by your account manager to 24/48/72 hours to accommodate your use case) from the time the order is created, to redirect your payer. Once redirected, the API caller has 3 hours for the payer to approve the order and either authorize or capture the order. If you are not using the PayPal JavaScript SDK to initiate PayPal Checkout (in context) ensure that you include application_context.return_url is specified or you will get "We are sorry, Things donnot appear to be working at the moment" after the payer approves the payment.'
            readonly />   
        </Box>
        );
    }
}

export default CreateOrderResponse;