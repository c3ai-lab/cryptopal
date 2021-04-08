import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class UpdateProductPath extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="product_id" 
            type="string"
            required 
            description="The product ID." />
        </Box>
        );
    }
}

export default UpdateProductPath;