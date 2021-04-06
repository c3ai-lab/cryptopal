import React from "react";
import Box from "../../layout/Box/Box";
import Parameter from "../../layout/Parameter/Parameter"
import "../../layout/General.css"

class RequestHeader extends React.Component {

    render () {
        const descriptionAuth = (
            <div>
                To make REST API calls, include the bearer token in the <span className="highlight-code">Authorization</span> 
                header with the <span className="highlight-code">Bearer</span> authentication scheme. The value is 
                <span className="highlight-code">Bearer &lt;Access-Token&gt;</span> or 
                <span className="highlight-code">Basic &lt;client_id&gt;:&lt;secret&gt;</span>.
            </div>);

        const descriptionContent = (
            <div>
                The media type. Required for operations with a request body. The value is application/&lt;format&gt;, where format is json.
            </div>
        );

        return( 
        <Box>
            <Parameter 
            name="Authorization" 
            type="string" 
            required={true}
            description={descriptionAuth}/>

            <hr></hr>
            <Parameter 
            name="Content-Type" 
            type="string"
            required={true}
            description={descriptionContent}/>
        </Box>
        );
    }
}

export default RequestHeader;