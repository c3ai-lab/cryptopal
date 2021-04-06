import React from "react";
import Box from "../../layout/Box/Box";
import Parameter from "../../layout/Parameter/Parameter"
import "../../layout/General.css"

class ListResponse extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="products" 
            type="array (contains the product_collection_element object)" 
            description="An array of products."/>

            <hr></hr>
            <Parameter 
            name="total_items" 
            type="integer" 
            description="The total number of items." 
            maxValue="500000000"/>

            <hr></hr>
            <Parameter 
            name="total_pages" 
            type="integer" 
            description="The total number of pages."
            maxValue="100000000"/>

            <hr></hr>
            <Parameter 
            name="links" 
            type="array (contains the link_description object)" 
            description="An array of request-related HATEOAS links."
            readonly/>
        </Box>
        );
    }
}

export default ListResponse;