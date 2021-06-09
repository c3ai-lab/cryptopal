import React from "react";
import Box from "../../../../layout/Box/Box";
import Parameter from "../../../../layout/Parameter/Parameter"
import "../../../../layout/General.css"

class ShowDetailsPath extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="authorization_id" 
            type="string"
            required 
            description="The ID of the authorized payment." />
        </Box>
        );
    }
}

export default ShowDetailsPath;