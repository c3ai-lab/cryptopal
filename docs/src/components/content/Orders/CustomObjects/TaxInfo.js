import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class TaxInfo extends React.Component {

    render () {
        const typeDescription = (
            <div>
                The customer's tax ID type.
                <br></br><br></br>
                Possible values: 
                <ul>
                    <li><span className="highlight-code">BR_CPF</span>. The individual tax ID type, typically is 11 characters long.</li>    
                    <li><span className="highlight-code">BR_CNPJ</span>. The business tax ID type, typically is 14 characters long.</li>    
                </ul>
            </div>
        );
        return( 
        <Box>
            <Parameter 
            name="tax_id" 
            type="string"
            required 
            description="The customer's tax ID value." 
            maxLength="14"/>

            <hr></hr>
            <Parameter 
            name="tax_id_type" 
            type={typeDescription}
            required />
        </Box>
        );
    }
}

export default TaxInfo;