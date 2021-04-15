import React from "react";
class UpdateOrderDescription extends React.Component {

    render () {
        return  (
            <div>
                Updates an order with the <span className="highlight-code">CREATED</span> or
                <span className="highlight-code">APPROVED</span> status. You cannot update an
                order with the <span className="highlight-code">COMPLETED</span> status.

                You can patch these attributes and objects to complete these operations:

                <ul>
                    <li><span className="highlight-code">intent</span> - replace</li>
                    <li><span className="highlight-code">payer</span> - replace, add</li>
                    <li><span className="highlight-code">purchase_units</span> - replace, add</li>
                    <li><span className="highlight-code">purchase_units[].custom_id</span> - replace, add, remove</li>
                    <li><span className="highlight-code">purchase_units[].description</span> - replace, add, remove</li>
                    <li><span className="highlight-code">purchase_units[].payee.email</span> - replace</li>
                    <li><span className="highlight-code">purchase_units[].shipping.name</span> - replace, add</li>
                    <li><span className="highlight-code">purchase_units[].shipping.address</span> - replace, add</li>
                    <li><span className="highlight-code">purchase_units[].shipping.type</span> - replace, add</li>
                    <li><span className="highlight-code">purchase_units[].soft_descriptor</span> - replace, remove</li>
                    <li><span className="highlight-code">purchase_units[].amount</span> - replace</li>
                    <li><span className="highlight-code">purchase_units[].invoice_id</span> - replace, add, remove</li>
                    <li><span className="highlight-code">purchase_units[].payment_instruction</span> - replace</li>
                    <li><span className="highlight-code">purchase_units[].payment_instruction.disbursement_mode</span> - replace</li>
                    <li><span className="highlight-code">purchase_units[].payment_instruction.platform_fees</span> - replace, add, remove</li>
                </ul>
            </div>
        );
    }
}

export default UpdateOrderDescription;