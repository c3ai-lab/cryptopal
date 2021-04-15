import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class Item extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="name" 
            required
            type="string" 
            description="The item name or title."
            minLength="1"
            maxLength="127" />

            <hr></hr>
            <Parameter 
            name="uint_amount" 
            type={<a href="#money">object</a>} 
            required
            description={
                <span>
                    The item price or rate per unit. If you specify 
                    <span className="highlight-code">unit_amount</span>,  
                    <span className="highlight-code">purchase_units[].amount.breakdown.item_total</span> is required. 
                    Must equal  <span className="highlight-code">unit_amount * quantity</span> for all items. 
                    <span className="highlight-code">unit_amount.value</span> can not be a negative number.
                </span>}
            />

            <hr></hr>
            <Parameter 
            name="tax" 
            type={<a href="#money">object</a>} 
            description={
                <span>
                    The item tax for each unit. If tax is specified, 
                    <span className="highlight-code">purchase_units[].amount.breakdown.tax_total</span> is required. 
                    Must equal <span className="highlight-code">tax * quantity</span> for all items. 
                    <span className="highlight-code">tax.value</span> can not be a negative number.
                </span>}
            />

            <hr></hr>
            <Parameter 
            name="quyntity"
            type="string" 
            required
            description="The item quantity. Must be a whole number."
            maxLength="10"
            pattern="Pattern: ^[1-9][0-9]{0,9}$."
            />
            
            <hr></hr>
            <Parameter 
            name="description"
            type="string" 
            description="The detailed item description."
            maxLength="127"/>

            <hr></hr>
            <Parameter 
            name="sku"
            type="string" 
            description="The stock keeping unit (SKU) for the item."
            maxLength="127"/>
              
            <hr></hr>
            <Parameter 
            name="category"
            type="enum" 
            description={
                    <div>
                        The item category type.
                        <br></br><br></br>
                        The possible values are:
                        <ul>
                            <li><span className="highlight-code">DIGITAL_GOODS</span>.  Goods that are stored, 
                            delivered, and used in their electronic format.</li>
                            <li><span className="highlight-code">PHYSICAL_GOODS</span>. The funds are held for 
                            a finite number of days. The actual duration depends on the region and type of 
                            integration. You can release the funds through a referenced payout. Otherwise, 
                            the funds disbursed automatically after the specified duration.</li>
                        </ul>
                    </div>
            }
            minLength="1"
            maxLength="20"/>
            

        </Box>
        );
    }
}

export default Item;