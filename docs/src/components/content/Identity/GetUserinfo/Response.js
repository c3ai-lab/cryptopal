import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class Response extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="user_id" 
            type="string" 
            description="The Private Personal Identifier (PPID) that is unique for the end user and Relying Party." />

            <hr></hr>
            <Parameter 
            name="name" 
            type="string" 
            description="The full name of the user. Includes all name parts, including titles and suffixes. The user's locale and preferences determine the syntax."/>

            <hr></hr>
            <Parameter 
            name="given_name" 
            type="string" 
            description="The given, or first, name of the user."/>

            <hr></hr>
            <Parameter 
            name="family_name" 
            type="string" 
            description="The surname or family name of the user. Also known as the last name. Used also to store multiple surnames including the matronymic, or mother's, surname."/>

            <hr></hr>
            <Parameter 
            name="emails" 
            type="array (contains the email object)" 
            description="An array of email addresses for the user."/>
        </Box>
        );
    }
}

export default Response;