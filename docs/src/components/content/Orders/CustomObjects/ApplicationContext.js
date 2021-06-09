import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"

class ApplicationContext extends React.Component {

    render () {
        return( 
        <Box>
            <Parameter 
            name="brand_name" 
            type="string" 
            description="The label that overrides the business name in the CryptoPal account on the CryptoPal site."
            maxLength="127" />

            <hr></hr>
            <Parameter 
            name="locale" 
            type="string" 
            description="The BCP 47-formatted locale of pages that the CryptoPal payment experience shows. CryptoPal supports a five-character code. For example, da-DK, he-IL, id-ID, ja-JP, no-NO, pt-BR, ru-RU, sv-SE, th-TH, zh-CN, zh-HK, or zh-TW."
            minLength="2"
            maxLength="10"
            pattern="^[a-z]{2}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}))?$" />

            <hr></hr>
            <Parameter 
            name="landing_page" 
            type="enum"
            required
            description={
                <div>
                    The type of landing page to show on the CryptoPal site for customer checkout.
                    <br></br><br></br>
                    The possible values are:
                    <ul>
                        <li>
                            <span className="highlight-code">LOGIN</span>. When the customer clicks 
                            CryptoPal Checkout, the customer is redirected to a page to log in to CryptoPal and approve the payment.
                        </li>
                        <li>
                            <span className="highlight-code">BILLING</span>. When the customer clicks CryptoPal Checkout, the customer 
                            is redirected to a page to enter credit or debit card and other relevant billing information required to 
                            complete the purchase.
                        </li>
                        <li>
                            <span className="highlight-code">NO_PREFERENCE</span>. When the customer clicks CryptoPal Checkout, 
                            the customer is redirected to either a page to log in to CryptoPal and approve the payment or to a page to 
                            enter credit or debit card and other relevant billing information required to complete the purchase, 
                            depending on their previous interaction with CryptoPal.
                        </li>
                    </ul>
                </div>
            }/>

            <hr></hr>
            <Parameter 
            name="shipping_preference" 
            type="enum" 
            description={
                <div>
                    The shipping preference:
                    <ul>
                        <li>Displays the shipping address to the customer.</li>
                        <li>Enables the customer to choose an address on the CryptoPal site.</li>
                        <li>Restricts the customer from changing the address during the payment-approval process.</li>
                    </ul>
                    <br></br><br></br>
                    The possible values are:
                    <ul>
                        <li>
                            <span className="highlight-code">GET_FROM_FILE</span>. Use the customer-provided shipping address 
                            on the CryptoPal site.
                        </li>
                        <li>
                            <span className="highlight-code">NO_SHIPPING</span>.Redact the shipping address from the CryptoPal site. 
                            Recommended for digital goods.
                        </li>
                        <li>
                            <span className="highlight-code">SET_PROVIDED_ADDRESS</span>. Use the merchant-provided address. 
                            The customer cannot change this address on the CryptoPal site.
                        </li>
                    </ul>
                </div>
            }/>

            <hr></hr>
            <Parameter 
            name="user_action" 
            type="enum" 
            description={
                <div>
                    Configures a Continue or Pay Now checkout flow.
                    <br></br><br></br>
                    The possible values are:
                    <ul>
                        <li>
                            <span className="highlight-code">CONTINUE</span>.  After you redirect the customer to the CryptoPal 
                            payment page, a Continue button appears. Use this option when the final amount is not known when 
                            the checkout flow is initiated and you want to redirect the customer to the merchant page without 
                            processing the payment.
                        </li>
                        <li>
                            <span className="highlight-code">PAY_NOW</span>.After you redirect the customer to the CryptoPal 
                            payment page, a Pay Now button appears. Use this option when the final amount is known when the 
                            checkout is initiated and you want to process the payment immediately when the customer clicks Pay Now.
                        </li>
                    </ul>
                </div>
            }/>

            <hr></hr>
            <Parameter 
            name="payment_method" 
            type={<a href="payment_method">object</a>}
            description="To be modified"/>

            <hr></hr>
            <Parameter 
            name="return_url" 
            type="string"
            description="The URL where the customer is redirected after the customer approves the payment."/>

            <hr></hr>
            <Parameter 
            name="cancel_url" 
            type="string"
            description="The URL where the customer is redirected after the customer cancels the payment."/>

            <hr></hr>
            <Parameter 
            name="stored_payment_source" 
            type={<a href="payment_source">object</a>}
            description="To be modified"/>
        </Box>
        );
    }
}

export default ApplicationContext;