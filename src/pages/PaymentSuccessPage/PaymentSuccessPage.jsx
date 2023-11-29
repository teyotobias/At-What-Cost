// PaymentSuccessPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifySession } from '../../utilities/orders-api';
import CustomModal from '../../components/CustomModal/CustomModal';
export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (sessionId) {
        try {
          const response = await verifySession(sessionId);
          if (response.verified) {
            setShowModal(true);
          } else {
            navigate('/orders/new');
          }
        } catch (error) {
          console.error('Verification failed: ', error);
          navigate('/orders/new')
        }
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  return (
    <div>
      Verifying your payment...
      {showModal && (
        <CustomModal
          message="Payment Successful!"
          onClose={() => {
            setShowModal(false); // Hide modal on close
            navigate('/orders'); // Navigate to Order History
          }}
          closeMessage="Order History"
        />
      )}
    </div>
  );

}