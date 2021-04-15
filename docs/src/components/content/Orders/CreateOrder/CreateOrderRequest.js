import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class CreateOrderRequest extends React.Component {

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
        return( 
        <Box>
            <Parameter 
            name="intent" 
            type="enum" 
            description={intentDescription} 
            required/>

            <hr></hr>
            <Parameter 
            name="payer" 
            type={<a href="/orders/custom-objects#payer">object</a>} 
            description="The customer who approves and pays for the order. The customer is also known as the payer."/>

            <hr></hr>
            <Parameter 
            name="purchase_units" 
            type={<span>array (contains the <a href="/orders/custom-objects#purchase_unit_request">purchase_unit_request</a> object)</span>} 
            description="An array of purchase units. Each purchase unit establishes a contract between a payer and the payee. Each purchase unit represents either a full or partial order that the payer intends to purchase from the payee."
            required/>

            <hr></hr>
            <Parameter 
            name="application_context" 
            type={<a href="/orders/custom-objects#application_context">object</a>}
            description="Customize the payer experience during the approval process for the payment with CryptoPal."/>
        </Box>
        );
    }
}

export default CreateOrderRequest;