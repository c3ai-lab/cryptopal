import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class PhoneNumber extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="national_number" 
            type="string"
            required 
            description="The national number, in its canonical international E.164 numbering plan format. The combined length of the country calling code (CC) and the national number must not be greater than 15 digits. The national number consists of a national destination code (NDC) and subscriber number (SN)." 
            minLength="1"
            maxLength="14"
            pattern="^[0-9]{1,14}?$"/>
        </Box>
        );
    }
}

export default PhoneNumber;