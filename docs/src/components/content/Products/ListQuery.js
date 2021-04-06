import React from "react";
import Box from "../../layout/Box/Box";
import Parameter from "../../layout/Parameter/Parameter"
import "../../layout/General.css"

class ListQuery extends React.Component {

    render () {
        const descriptionPage = (
            <div>
                A non-zero integer which is the start index of the entire list of items that are returned 
                in the response. So, the combination of <span className="highlight-code">page=1</span> and 
                <span className="highlight-code">page_size=20</span> returns the first 20 items. The 
                combination of <span className="highlight-code">page=2</span> and 
                <span className="highlight-code">page_size=20</span> returns the next 20 items."
            </div>);
        return( 
        <Box>
            <Parameter 
            name="page_size" 
            type="integer" 
            description="The number of items to return in the response." 
            minValue="1" 
            maxValue="20"/>

            <hr></hr>
            <Parameter 
            name="page" 
            type="integer" 
            description={descriptionPage} 
            minValue="1" 
            maxValue="100000"/>

            <hr></hr>
            <Parameter 
            name="total_required" 
            type="boolean" 
            description="Indicates whether to show the total items and total pages in the response."/>
        </Box>
        );
    }
}

export default ListQuery;