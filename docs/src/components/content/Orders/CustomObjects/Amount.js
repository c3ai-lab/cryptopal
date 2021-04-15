import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class Amount extends React.Component {

    render () {
        const valueDescription = (
            <div>
                The value, which might be:
                <br></br><br></br>
                <ul>
                    <li>An integer for currencies like  <span className="highlight-code">JPY</span> that are not typically fractional.</li>
                    <li>A decimal fraction for currencies like  <span className="highlight-code">TND</span> that are subdivided into thousandths.</li>
                </ul>
                For the required number of decimal places for a currency code, see Currency Codes.
            </div>
        );
        return( 
        <Box>
            <Parameter 
            name="currency_code" 
            type="string" 
            required
            description="The three-character ISO-4217 currency code that identifies the currency."
            minLength="3"
            maxLength="3" />

            <hr></hr>
            <Parameter 
            name="value" 
            type="string" 
            required
            description={valueDescription}
            maxLength="32" 
            pattern="^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$."/>

            <hr></hr>
            <Parameter 
            name="breakdown" 
            type={<a href="#breakdown">object</a>}
            description="The breakdown of the amount. Breakdown provides details such as total item amount, total tax amount, shipping, handling, insurance, and discounts, if any."/>

        </Box>
        );
    }
}

export default Amount;