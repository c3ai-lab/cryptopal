import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class Link extends React.Component {

    render () {
        const methodDescription= (<div>
            The HTTP method required to make the related call.
            <br></br><br></br>
            Possible values: <span className="highlight-code">GET</span>,<span className="highlight-code">POST</span>,
            <span className="highlight-code">PUT</span>,<span className="highlight-code">DELETE</span>,
            <span className="highlight-code">HEAD</span>,<span className="highlight-code">CONNECT</span>,
            <span className="highlight-code">OPTIONS</span>,<span className="highlight-code">PATCH</span>.
        </div>);

        return( 
        <Box>
            <Parameter 
            name="href" 
            type="string" 
            description="The complete target URL. To make the related call, combine the method with this URI Template-formatted link. For pre-processing, include the $, (, and ) characters. The href is the key HATEOAS component that links a completed call with a subsequent call."
            required/>

            <hr></hr>
            <Parameter 
            name="rel" 
            type="string" 
            description="The link relation type, which serves as an ID for a link that unambiguously describes the semantics of the link."
            required />

            <hr></hr>
            <Parameter 
            name="method" 
            type="enum" 
            description={methodDescription} />
        </Box>
        );
    }
}

export default Link;