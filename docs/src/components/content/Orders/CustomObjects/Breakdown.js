import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class Breakdown extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="item_total" 
            type={<a href="#money">object</a>} 
            description={
                <p>
                    The subtotal for all items. Required if the request includes 
                    <span className="highlight-code"> purchase_units[].items[].unit_amount</span>. 
                    Must equal the sum of <span className="highlight-code">(items[].unit_amount * items[].quantity) </span> 
                    for all items. <span className="highlight-code">item_total.value</span> can not be a negative number.
                </p>
                }
            />

            <hr></hr>
            <Parameter 
            name="shipping" 
            type={<a href="#money">object</a>} 
            description={
                <p>
                    The shipping fee for all items within a given purchase_unit. <span className="highlight-code">shipping.value</span> can not be a negative number.
                </p>
                }
            />

            <hr></hr>
            <Parameter 
            name="handling" 
            type={<a href="#money">object</a>} 
            description={
                <p>
                   The handling fee for all items within a given <span className="highlight-code">purchase_unit</span>. 
                   <span className="highlight-code">handling.value</span> can not be a negative number.
                </p>
                }
            />

            <hr></hr>
            <Parameter 
            name="tax_total" 
            type={<a href="#money">object</a>} 
            description={
                <p>
                    The total tax for all items. Required if the request includes <span className="highlight-code">purchase_units.items.tax.</span> 
                    Must equal the sum of <span className="highlight-code">(items[].tax * items[].quantity)</span> for all items. 
                    <span className="highlight-code">tax_total.value</span> can not be a negative number.
                </p>
                }
            />

            <hr></hr>
            <Parameter 
            name="insurace" 
            type={<a href="#money">object</a>} 
            description={
                <p>
                    The insurance fee for all items within a given <span className="highlight-code">purchase_unit</span>. 
                    <span className="highlight-code">insurance.value</span> can not be a negative number.
                </p>
                }
            />

            <hr></hr>
            <Parameter 
            name="shipping_discount" 
            type={<a href="#money">object</a>} 
            description={
                <p>
                    The shipping discount for all items within a given <span className="highlight-code">purchase_unit</span>. 
                    <span className="highlight-code">discount.value</span> can not be a negative number.
                </p>
                }
            />

            <hr></hr>
            <Parameter 
            name="discount" 
            type={<a href="#money">object</a>} 
            description={
                <p>
                    The discount for all items within a given <span className="highlight-code">purchase_unit</span>. 
                    <span className="highlight-code">discount.value</span> can not be a negative number.
                </p>
                }
            />

        </Box>
        );
    }
}

export default Breakdown;