import React from "react";
import Box from "../../../../layout/Box/Box";
import Parameter from "../../../../layout/Parameter/Parameter"
import "../../../../layout/General.css"

class ShowDetailsPath extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="capture_id" 
            type="string"
            required 
            description="The ID of the captured payment." />
        </Box>
        );
    }
}

export default ShowDetailsPath;