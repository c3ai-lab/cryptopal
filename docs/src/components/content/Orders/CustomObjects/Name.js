import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class Payer extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="prefix" 
            type="string" 
            description="The prefix, or title, to the party's name." 
            maxLength="140"/>

            <hr></hr>
            <Parameter 
            name="given_name" 
            type="string" 
            description="When the party is a person, the party's given, or first, name." 
            maxLength="140"/>
            <hr></hr>

            <Parameter 
            name="surname" 
            type="string" 
            description="When the party is a person, the party's surname or family name. Also known as the last name. Required when the party is a person. Use also to store multiple surnames including the matronymic, or mother's, surname." 
            maxLength="140"/>
            <hr></hr>
            
            <Parameter 
            name="middle_name" 
            type="string" 
            description="When the party is a person, the party's middle name. Use also to store multiple middle names including the patronymic, or father's, middle name." 
            maxLength="140"/>

            <hr></hr>
            <Parameter 
            name="suffix" 
            type="string" 
            description="The suffix for the party's name." 
            maxLength="140"/>

            <hr></hr>
            <Parameter 
            name="full_name" 
            type="string" 
            description="When the party is a person, the party's full name." 
            maxLength="300"/>

        
            </Box>
        );
    }
}

export default Payer;