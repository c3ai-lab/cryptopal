import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class AuthorizationStatus extends React.Component {

    render () {
        const methodDescription= (<div>
            The reason why the authorized status is  <span className="highlight-code">PENDING</span>.
            <br></br><br></br>
            Possible values are: 
            <ul>
                <li>
                    <span className="highlight-code">PENDING</span> Authorization is pending manual review.
                </li>
            </ul>
        </div>);

        return( 
        <Box>
            <Parameter 
            name="reason" 
            type="enum" 
            description={methodDescription} />
        </Box>
        );
    }
}

export default AuthorizationStatus;