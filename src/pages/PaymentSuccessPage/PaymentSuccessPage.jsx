// PaymentSuccessPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifySession } from '../../utilities/orders-api';
import { toast } from 'react-toastify';
import './PaymentSuccessPage.css';
import Logo from '../../components/Logo/Logo';
export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // useEffect(() => {
  //   const verifyPayment = async () => {
  //     if (sessionId) {
  //       try {
  //         const response = await verifySession(sessionId);
  //         if (response.verified) {
  //           setShowModal(true);
  //         } else {
  //           navigate('/orders/new');
  //         }
  //       } catch (error) {
  //         console.error('Verification failed: ', error);
  //         navigate('/orders/new')
  //       }
  //     }
  //   };

  //   verifyPayment();
  // }, [sessionId, navigate]);


  useEffect(() => {
    const verifyPayment = async () => {
      if (sessionId) {
        try {
          const response = await verifySession(sessionId);
          if (response.verified) {
            // Call the toast function with a custom render component

            const toastId = 'paymentSuccessId';
            toast(<div className="toastContainer">
              Thank You! 
              <button onClick={() => {
                toast.dismiss(toastId);
                navigate('/orders');
               }} 
               style={{ display: 'block', marginTop: '10px', color: 'rgb(102,102,102', background: 'rgb(206,251,244)', cursor: 'pointer' }}>
                Go to Orders
              </button>
            </div>, {
              position: "bottom-center",
              autoClose: false,
              closeOnClick: false,
              draggable: true,
              toastId: toastId, // Ensure unique ID
              style: { marginBottom: 'clamp(5px, 5vh, 10px'},
            });
          } else {
            navigate('/orders/new');
          }
        } catch (error) {
          console.error('Verification failed: ', error);
          navigate('/orders/new');
        }
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  return (
    <>
      <div className="logoContainer"style={{ maxWidth: '60%', margin: '0 auto', display: 'block' }}>
        <Logo />
      </div>
    </>

  );

}