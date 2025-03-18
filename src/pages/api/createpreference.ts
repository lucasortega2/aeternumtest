import type { APIRoute } from 'astro';

import { MercadoPagoConfig, Preference } from 'mercadopago';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { items } = await request.json();

    const client = new MercadoPagoConfig({
      accessToken: import.meta.env.ACCESS_TOKEN_MP,
    });

    const body = {
      items,
      back_urls: {
        success: 'https://aeternum-tau.vercel.app/checkout/success',
        failure: 'https://aeternum-tau.vercel.app/checkout/failure',
        pending: 'https://aeternum-tau.vercel.app/checkout/pending',
      },
      auto_return: 'approved',
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
