import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class Payer extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="email_address" 
            type="string" 
            description="The email address of the payer." 
            maxLength="254"/>

            <hr></hr>
            <Parameter 
            name="payer_id" 
            type="string" 
            description="The CryptoPal-assigned ID for the payer."
            minLength="13" 
            maxLength="13"/>

            <hr></hr>
            <Parameter 
            name="name" 
            type={<a href="#name">object</a>} 
            description="The name of the payer. Supports only the given_name and surname properties."
            minLength="1" 
            maxLength="256"/>

            <hr></hr>
            <Parameter 
            name="phone" 
            type={<a href="#phone">object</a>} 
            description="The phone number of the customer. Available only when you enable the Contact Telephone Number option in the Profile & Settings for the merchant's CryptoPal account. The phone.phone_number supports only national_number."/>

            <hr></hr>
            <Parameter 
            name="birth_date" 
            type="string" 
            description="The birth date of the payer in YYYY-MM-DD format."/>

            <hr></hr>
            <Parameter 
            name="tax_info" 
            type={<a href="#tax_info">object</a>}
            description="The tax information of the payer. Required only for Brazilian payer's. Both tax_id and tax_id_type are required."/>

            <hr></hr>
            <Parameter 
            name="address" 
            type={<a href="#address">object</a>}
            description="The address of the payer. Supports only the address_line_1, address_line_2, admin_area_1, admin_area_2, postal_code, and country_code properties. Also referred to as the billing address of the customer."/>
        </Box>
        );
    }
}

export default Payer;