import React from "react";
import Box from "../../../layout/Box/Box";
import Parameter from "../../../layout/Parameter/Parameter"
import "../../../layout/General.css"

class CaptureStatus extends React.Component {

    render () {
        const methodDescription= (<div>
            The reason why the captured payment status is <span className="highlight-code">PENDING</span> or 
            <span className="highlight-code">DENIED</span>.
            <br></br><br></br>
            Possible values are: 
            <ul>
                <li>
                    <span className="highlight-code">BUYER_COMPLAINT</span> The payer initiated a dispute for this captured payment with CryptoPal.
                </li>
                <li>
                    <span className="highlight-code">CHARGEBACK</span> The captured funds were reversed in response to the payer disputing this 
                    captured payment with the issuer of the financial instrument used to pay for this captured payment.
                </li>
                <li>
                    <span className="highlight-code">ECHECK</span> The payer paid by an eCheck that has not yet cleared.
                </li>
                <li>
                    <span className="highlight-code">INTERNATIONAL_WITHDRAWAL</span> Visit your online account. In your **Account Overview**, 
                    accept and deny this payment.
                </li>
                <li>
                    <span className="highlight-code">OTHER</span> No additional specific reason can be provided. For more information about this
                    captured payment, visit your account online or contact CryptoPal.
                </li>
                <li>
                    <span className="highlight-code">PENDING_REVIEW</span> The captured payment is pending manual review.
                </li>
                <li>
                    <span className="highlight-code">RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION</span> The payee has not yet set up appropriate 
                    receiving preferences for their account. For more information about how to accept or deny this payment, visit your account 
                    online. This reason is typically offered in scenarios such as when the currency of the captured payment is different from the 
                    primary holding currency of the payee.
                </li>
                <li>
                    <span className="highlight-code">REFUNDED</span> The captured funds were refunded.
                </li>
                <li>
                    <span className="highlight-code">TRANSACTION_APPROVED_AWAITING_FUNDING</span>  The payer must send the funds for this captured 
                    payment. This code generally appears for manual EFTs.
                </li>
                <li>
                    <span className="highlight-code">UNILATERAL</span> The payee does not have a CryptoPal account.
                </li>
                <li>
                    <span className="highlight-code">VERIFICATION_REQUIRED</span>  The payee's CryptoPal account is not verified.
                </li>
            </ul>
        </div>);

        return( 
        <Box>
            <Parameter 
            name="reason" 
            type="enum" 
            description={methodDescription} />
        </Box>
        );
    }
}

export default CaptureStatus;