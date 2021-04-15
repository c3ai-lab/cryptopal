import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class Shipping extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="name" 
            type={<a href="#shipping.name">object</a>} 
            description="The item name or title."
            minLength="1"
            maxLength="127" />

            <hr></hr>
            <Parameter 
            name="type" 
            type="enum"
            required
            description={
                <div>
                    The method by which the payer wants to get their items from the payee e.g shipping, in-person pickup. Either type or options but not both may be present.
                    <br></br><br></br>
                    The possible values are:
                    <ul>
                        <li><span className="highlight-code">SHIPPING</span>. The payer intends to receive the items at a specified address.</li>
                        <li><span className="highlight-code">PICKUP_IN_PERSON</span>. The payer intends to pick up the items from the payee in person.</li>
                    </ul>
                </div>
            }
            minLength="1"
            maxLength="255"
            pattern="^[0-9A-Z_]+$"
            />

            <hr></hr>
            <Parameter 
            name="address" 
            type={<a href="#address">object</a>} 
            description="The address of the person to whom to ship the items."
            minLength="1"
            maxLength="127" />
        </Box>
        );
    }
}

export default Shipping;