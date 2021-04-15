import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class Payee extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="email_address" 
            type="string" 
            description="The email address of merchant." />

            <hr></hr>
            <Parameter 
            name="merchant_id" 
            type="string" 
            description="The encrypted CryptoPal account ID of the merchant." />

        </Box>
        );
    }
}

export default Payee;