import type { APIRoute } from 'astro';
import { MercadoPagoConfig, Payment } from 'mercadopago';
export const prerender = false;
export const GET: APIRoute = async ({ url }) => {
  const paymentId = url.searchParams.get('payment_id');

  if (!paymentId) {
    return new Response(JSON.stringify({ error: 'Payment ID no encontrado' }), {
      status: 400,
    });
  }

  const client = new MercadoPagoConfig({
    accessToken: import.meta.env.ACCESS_TOKEN_MP,
  });

  const payment = new Payment(client);

  try {
    const paymentInfo = await payment.get({ id: paymentId });

    return new Response(
      JSON.stringify({
        status: paymentInfo.status,
        status_detail: paymentInfo.status_detail,
        id: paymentInfo.id,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error consultando el pago:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
