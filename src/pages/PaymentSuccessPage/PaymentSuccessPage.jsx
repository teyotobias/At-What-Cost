// PaymentSuccessPage.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifySession } from '../../utilities/orders-api';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (sessionId) {
        try {
          const response = await verifySession(sessionId);
          if (response.verified) {
            alert('Checkout Successful.');
            navigate('/orders'); // Navigate to Order History
          } else {
            alert('Checkout Unsuccessful.');
            navigate('/cart'); // Navigate back to shopping on error
          }
        } catch (error) {
          console.error('Verification failed: ', error);
          alert('An error occurred during payment verification');
          navigate('/cart')
        }
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  return <div>Verifying your payment...</div>;
}