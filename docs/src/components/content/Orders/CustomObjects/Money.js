import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class Money extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="currency_code" 
            type="string" 
            required
            description="The three-character ISO-4217 currency code that identifies the currency."
            minLength="3"
            maxLength="3"
            />

            <hr></hr>
            <Parameter 
            name="value" 
            type="string"
            required
            description={
                <div>
                    The value, which might be:
                    <ul>
                        <li>An integer for currencies like JPY that are not typically fractional.</li>
                        <li>A decimal fraction for currencies like TND that are subdivided into thousandths.</li>
                    </ul>
                    For the required number of decimal places for a currency code, see Currency Codes.
                </div>
                }
            maxLength="32"
            pattern="^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$"
            />

        </Box>
        );
    }
}

export default Money;