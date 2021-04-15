import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class Phone extends React.Component {

    render () {
        const typeDescription = (
            <div>
                The phone type.
                <br></br><br></br>
                Possible values: <span className="highlight-code">FAX</span>, <span className="highlight-code">HOME</span>, 
                <span className="highlight-code">MOBILE</span>, <span className="highlight-code">OTHER</span>, 
                <span className="highlight-code">PAGER</span>.
            </div>
        );
        return( 
        <Box>
            <Parameter 
            name="phone_type" 
            type="enum" 
            description={typeDescription} />

            <hr></hr>
            <Parameter 
            name="phone_number" 
            type={<a href="#phone_number">object</a>} 
            description="The phone number, in its canonical international E.164 numbering plan format. Supports only the national_number property." 
            required/> 
        </Box>
        );
    }
}

export default Phone;