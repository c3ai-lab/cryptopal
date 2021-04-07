import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class Query extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="schema" 
            type="string" 
            description="No function yet. Can be left empty." />
        </Box>
        );
    }
}

export default Query;