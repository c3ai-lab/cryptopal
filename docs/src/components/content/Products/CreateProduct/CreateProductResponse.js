import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class CreateProductResponse extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="id" 
            type="string" 
            description="The ID of the product." 
            minLength="6" 
            maxLength="50"/>

            <hr></hr>
            <Parameter 
            name="name" 
            type="string" 
            description="The product name."
            minLength="1" 
            maxLength="127"/>

            <hr></hr>
            <Parameter 
            name="description" 
            type="string" 
            description="The product description."
            minLength="1" 
            maxLength="256"/>

            <hr></hr>
            <Parameter 
            name="type" 
            type="string" 
            description="The product type. Indicates whether the product is physical or tangible goods, or a service."
            minLength="1" 
            maxLength="24"
            pattern="^[A-Z_]+$"/>

            <hr></hr>
            <Parameter 
            name="category" 
            type="string" 
            description="The product category."
            minLength="1" 
            maxLength="64"/>

            <hr></hr>
            <Parameter 
            name="img_url" 
            type="string" 
            description="The image URL for the product."
            minLength="1" 
            maxLength="2000"/>

            <hr></hr>
            <Parameter 
            name="home_url" 
            type="string" 
            description="The home URL for the product."
            minLength="1" 
            maxLength="2000"/>

            <hr></hr>
            <Parameter 
            name="create_time" 
            type="string" 
            description="The date and time when the product was created, in Internet date and time format."
            readonly
            minLength="20" 
            maxLength="64"
            pattern="^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"/>
            
            <hr></hr>
            <Parameter 
            name="update_time" 
            type="string" 
            description="The date and time when the product was last updated, in Internet date and time format."
            readonly
            minLength="20" 
            maxLength="64"
            pattern="^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[T,t]([0-1][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)([.][0-9]+)?([Zz]|[+-][0-9]{2}:[0-9]{2})$"/>
        </Box>
        );
    }
}

export default CreateProductResponse;