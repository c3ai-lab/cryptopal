import React from "react";
import Box from "../../layout/Box/Box";
import Parameter from "../../layout/Parameter/Parameter"
import "../../layout/General.css"

class RequestHeader extends React.Component {

    render () {
        const descriptionAuth = (
            <div>
                To make REST API calls, include the authorization token in the <span className="highlight-code">cp-auth-token</span> 
                header. The value is a JSON webtoken which you get from login route with user credentials.
            </div>);

        const descriptionContent = (
            <div>
                The media type. Required for operations with a request body. The value is application/&lt;format&gt;, where format is json.
            </div>
        );

        return( 
        <Box>
            <Parameter 
            name="cp-auth-token" 
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