import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class ShippingName extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="full_name" 
            type="string" 
            description="When the party is a person, the party's full name." 
            maxLength="300"/>
        </Box>
        );
    }
}

export default ShippingName;