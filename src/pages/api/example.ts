// File: src/pages/api/process-payment.js
import type { APIRoute } from 'astro';
import { Payment, MercadoPagoConfig } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this package
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    console.log(data);

    const client = new MercadoPagoConfig({
      accessToken: import.meta.env.ACCESS_TOKEN_MP, // Store your access token in .env file
    });

    const payment = new Payment(client);

    const paymentData = {
      body: {
        transaction_amount: data.transaction_amount,
        token: data.token,
        description: data.description,
        installments: data.installments,
        payment_method_id: data.payment_method_id,
        issuer_id: data.issuer_id,
        payer: {
          email: data.payer.email,
          identification: {
            type: data.payer.identification.type,
            number: data.payer.identification.number,
          },
        },
        binary_mode: data.binary_mode,
      },
      requestOptions: {
        idempotencyKey: uuidv4(), // Generate a unique UUID for each payment request
      },
    };

    const result = await payment.create(paymentData);
    console.log(result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Payment processing error:', error);

    return new Response(
      JSON.stringify({
        error: true,
        message: error.message || 'Error processing payment',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
