import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class PurchaseUnitRequest extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="reference_id" 
            type="string" 
            description="The API caller-provided external ID for the purchase unit. Required for multiple purchase units when you must update the order through PATCH. If you omit this value and the order contains only one purchase unit, PayPal sets this value to default."
            maxLength="256"/>

            <hr></hr>
            <Parameter 
            name="amount" 
            type={<a href="#amount_with_breakdown">object</a>} 
            description="The total order amount with an optional breakdown that provides details, such as the total item amount, total tax amount, shipping, handling, insurance, and discounts, if any.
            If you specify amount.breakdown, the amount equals item_total plus tax_total plus shipping plus handling plus insurance minus shipping_discount minus discount.
            The amount must be a positive number. For listed of supported currencies and decimal precision, see the PayPal REST APIs Currency Codes." 
            required/> 

            <hr></hr>
            <Parameter 
            name="payee" 
            type={<a href="#payee">object</a>} 
            description="The merchant who receives payment for this transaction." /> 

            <hr></hr>
            <Parameter 
            name="payment_instruction" 
            type={<a href="#payment_instruction">object</a>} 
            description="Any additional payment instructions for PayPal Commerce Platform customers. Enables features for the PayPal Commerce Platform, such as delayed disbursement and collection of a platform fee. Applies during order creation for captured payments or during capture of authorized payments." /> 
            
            <hr></hr>
            <Parameter 
            name="description" 
            type="string"
            description="The purchase description." 
            maxLength="127"/> 

            <hr></hr>
            <Parameter 
            name="custom_id" 
            type="string"
            description="The API caller-provided external ID. Used to reconcile client transactions with CryptoPal transactions. Appears in transaction and settlement reports but is not visible to the payer.." 
            maxLength="127"/> 

            <hr></hr>
            <Parameter 
            name="invoice_id" 
            type="string"
            description="The API caller-provided external invoice number for this order. Appears in both the payer's transaction history and the emails that the payer receives." 
            maxLength="127"/> 

            <hr></hr>
            <Parameter 
            name="soft_descriptor" 
            type="string"
            description="The soft descriptor is the dynamic text used to construct the statement descriptor that appears on a payer's card statement." 
            maxLength="22"/> 

            <hr></hr>
            <Parameter 
            name="items" 
            type={<div><p>array (contains the <a href="#item">item</a> object</p></div>} 
            description="An array of items that the customer purchases from the merchant." /> 

            <hr></hr>
            <Parameter 
            name="shipping" 
            type={<a href="#shipping">object</a>} 
            description="The name and address of the person to whom to ship the items." /> 
        </Box>
        );
    }
}

export default PurchaseUnitRequest;