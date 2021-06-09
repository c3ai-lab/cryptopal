import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class RefundStatus extends React.Component {

    render () {
        const methodDescription= (<div>
            The reason why the refund has the <span className="highlight-code">PENDING</span> or <span className="highlight-code">FAILED</span> status.
            <br></br><br></br>
            Possible values are: 
            <ul>
                <li>
                    <span className="highlight-code">ECHECK</span> The customer's account is funded through an eCheck, which has not yet cleared.
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

export default RefundStatus;