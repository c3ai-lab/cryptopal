import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class PlatformFee extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="amount" 
            required
            type={<a href="#money">object</a>} 
            description="The fee for this transaction." />

            <hr></hr>
            <Parameter 
            name="payee" 
            type={<a href="#payee">object</a>} 
            description="The recipient of the fee for this transaction. If you omit this value, the default is the API caller."/>

        </Box>
        );
    }
}

export default PlatformFee;