import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class Address extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="address_line_1" 
            type="string" 
            description="The first line of the address. For example, number or street. For example, 173 Drury Lane. Required for data entry and compliance and risk checks. Must contain the full address."
            maxLength="300" />

            <hr></hr>
            <Parameter 
            name="address_line_2" 
            type="string" 
            description="The second line of the address. For example, suite or apartment number."
            maxLength="300" />

            <hr></hr>
            <Parameter 
            name="admin_area_1" 
            type="string" 
            description="The second line of the address. For example, suite or apartment number."
            maxLength="300" />

            <hr></hr>
            <Parameter 
            name="admin_area_2" 
            type="string" 
            description="A city, town, or village. Smaller than admin_area_level_1."
            maxLength="120" />

            <hr></hr>
            <Parameter 
            name="postal_code" 
            type="string" 
            description="The postal code, which is the zip code or equivalent. Typically required for countries with a postal code or an equivalent. See postal code."
            maxLength="60" />

            <hr></hr>
            <Parameter 
            name="country" 
            type="string" 
            required
            description="The two-character ISO 3166-1 code that identifies the country or region."/>
        </Box>
        );
    }
}

export default Address;