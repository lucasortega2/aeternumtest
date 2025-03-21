import type { APIRoute } from 'astro';

import { MercadoPagoConfig, Preference } from 'mercadopago';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { items, payer } = await request.json();

    const client = new MercadoPagoConfig({
      accessToken: import.meta.env.ACCESS_TOKEN_MP,
    });

    const body = {
      items,
      back_urls: {
        success: 'https://5cb4-181-97-210-204.ngrok-free.app/checkout/status',
        failure: 'https://5cb4-181-97-210-204.ngrok-free.app/checkout/status',
        pending: 'https://5cb4-181-97-210-204.ngrok-free.app/checkout/status',
      },
      payer: {
        first_name: payer.firstName,
        last_name: payer.lastName,
        email: payer.email,
      },
      auto_return: 'approved',
      notification_url:
        'https://5cb4-181-97-210-204.ngrok-free.app/api/webhooks',
    };
    const preference = new Preference(client);

    const result = await preference.create({ body });

    return new Response(JSON.stringify({ id: result.id }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
      },
    );
  }
};
