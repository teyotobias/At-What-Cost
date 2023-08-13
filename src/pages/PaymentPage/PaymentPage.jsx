import StripeContainer from '../../components/StripeContainer/StripeContainer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';

export default function PaymentPage({ orderTotal: orderTotalProp }) {
    const location = useLocation();
    const orderTotal = location.state?.orderTotal || orderTotalProp;
    const navigate = useNavigate();

    return (
        <div className="PaymentPage">
            <StripeContainer 
                orderTotal={orderTotal} 
                handleSuccessfulPayment={() => {
                    navigate('/orders');
                }}
            />
        </div>
    );
}