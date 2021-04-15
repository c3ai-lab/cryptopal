import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class UpdateOrderRequest extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="patch_request" 
            type="array (contains the patch object)"
            description="An array of JSON patch objects to apply partial updates to resources." />
        </Box>
        );
    }
}

export default UpdateOrderRequest;