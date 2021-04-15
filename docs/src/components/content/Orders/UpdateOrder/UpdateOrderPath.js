import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class UpdateOrderPath extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="order_id" 
            type="string"
            required 
            description="The ID of the order to update." />
        </Box>
        );
    }
}

export default UpdateOrderPath;