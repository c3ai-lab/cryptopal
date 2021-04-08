import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class CreateProductRequest extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="id" 
            type="string" 
            description="The ID of the product. You can specify the ID for the product. If you omit the ID, the system generates it." 
            minLength="6" 
            maxLength="50"/>

            <hr></hr>
            <Parameter 
            name="name" 
            type="string" 
            description="The product name."
            required 
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
            required 
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
        </Box>
        );
    }
}

export default CreateProductRequest;