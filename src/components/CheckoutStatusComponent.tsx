import { useCartStore } from '@/stores/cartStore';
import React, { useEffect, useState } from 'react';

interface CheckoutSuccessComponentProps {
  paymentId: string;
}

interface PaymentInfo {
  status: string;
  status_detail: string;
  id: string;
}

const CheckoutSuccessComponent: React.FC<CheckoutSuccessComponentProps> = ({
  paymentId,
}) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentId) {
        setError('No se encontró información de pago');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/check?payment_id=${paymentId}`);

        if (!response.ok) {
          throw new Error('Error al verificar el pago');
        }

        const data = await response.json();
        setPaymentInfo(data);
        console.log(data);

        // Aquí puedes realizar acciones adicionales basadas en el estado del pago
        if (data.status === 'approved') {
          // Por ejemplo: registrar compra en base de datos, enviar email, etc.
          clearCart();
        }
      } catch (err) {
        setError('Error al verificar el estado del pago ');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aeternum-silver mb-4"></div>
        <p className="text-lg text-aeternum-silver">Procesando tu pago...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-aeternum-dark">
        <div className="bg-aeternum-medium border border-red-700 text-aeternum-silver px-4 py-3 rounded max-w-lg mx-auto">
          <strong className="font-bold text-red-400">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <p className="text-md text-aeternum-silver mt-4">
            Para más información, contacta a nuetrso servicio de atención al
            cliente.
          </p>
        </div>
      </div>
    );
  }

  if (!paymentInfo) {
    return (
      <div className="text-aeternum-silver text-center p-6">
        No se pudo obtener información del pago
      </div>
    );
  }

  // Traducir los estados de pago a mensajes amigables
  const getStatusMessage = () => {
    switch (paymentInfo.status) {
      case 'approved':
        return '¡Pago completado con éxito!';
      case 'pending':
        return 'Pago en proceso';
      case 'rejected':
        return 'Pago rechazado';
      default:
        return 'Estado de pago';
    }
  };

  // Traducir los detalles de estado a mensajes amigables
  const getDetailMessage = () => {
    // Puedes expandir esto para traducir los diferentes códigos de status_detail
    // que te devuelve Mercado Pago a mensajes más amigables
    const details: { [key: string]: string } = {
      accredited: 'Tu pago ha sido acreditado correctamente.',
      pending_contingency: 'El pago está siendo procesado.',
      pending_review_manual: 'El pago está siendo revisado.',
      cc_rejected_bad_filled_date:
        'Revisa la fecha de vencimiento de tu tarjeta.',
      cc_rejected_bad_filled_security_code:
        'Revisa el código de seguridad de tu tarjeta.',
      cc_rejected_card_disabled:
        'Llama a tu banco para activar tu tarjeta o usa otro medio de pago.',
      cc_rejected_insufficient_amount:
        'Tu tarjeta no tiene fondos suficientes.',
      cc_rejected_other_reason: 'Tu tarjeta fue rechazada.',
    };

    return details[paymentInfo.status_detail] || paymentInfo.status_detail;
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-aeternum-medium rounded-lg shadow-lg border border-aeternum-light">
      <h1 className="text-2xl font-bold mb-6 text-center text-aeternum-silver">
        {getStatusMessage()}
      </h1>

      <div className="mb-6">
        <div
          className={`text-center p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 ${
            paymentInfo.status === 'approved'
              ? 'bg-aeternum-light text-green-400'
              : paymentInfo.status === 'pending'
              ? 'bg-aeternum-light text-yellow-400'
              : 'bg-aeternum-light text-red-400'
          }`}
        >
          {paymentInfo.status === 'approved' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : paymentInfo.status === 'pending' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      </div>

      <div className="bg-aeternum-light p-6 rounded-lg border border-aeternum-accent/20 text-center">
        <p
          className={`text-lg mb-4 ${
            paymentInfo.status === 'approved'
              ? 'text-green-400'
              : paymentInfo.status === 'pending'
              ? 'text-yellow-400'
              : 'text-red-400'
          }`}
        >
          {getDetailMessage()}
        </p>

        <p className="text-aeternum-accent text-sm mt-4">
          {paymentInfo.status === 'approved'
            ? 'Gracias por tu compra.'
            : paymentInfo.status === 'pending'
            ? 'Te notificaremos cuando el pago se complete.'
            : 'Por favor intenta con otro método de pago o contacta a soporte.'}
        </p>
      </div>

      {paymentInfo.status === 'approved' && (
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-block bg-aeternum-accent hover:bg-aeternum-highlight text-aeternum-black font-medium py-2 px-4 rounded transition duration-300"
          >
            Volver al inicio
          </a>
        </div>
      )}

      {paymentInfo.status === 'pending' && (
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-block bg-aeternum-accent hover:bg-aeternum-highlight text-aeternum-black font-medium py-2 px-4 rounded transition duration-300"
          >
            Volver al inicio
          </a>
        </div>
      )}

      {paymentInfo.status === 'rejected' && (
        <div className="mt-6 text-center">
          <a
            href="/checkout"
            className="inline-block bg-aeternum-accent hover:bg-aeternum-highlight text-aeternum-black font-medium py-2 px-4 rounded transition duration-300"
          >
            Intentar nuevamente
          </a>
        </div>
      )}
    </div>
  );
};

export default CheckoutSuccessComponent;
