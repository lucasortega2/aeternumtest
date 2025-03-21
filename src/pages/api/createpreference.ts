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
        success: 'https://aeternumtest.vercel.app/checkout/status',
        failure: 'https://aeternumtest.vercel.app/checkout/status',
        pending: 'https://aeternumtest.vercel.app/checkout/status',
      },
      // payer: {
      //   first_name: payer.firstName,
      //   last_name: payer.lastName,
      //   email: payer.email,
      //   identification: {
      //     type: 'DNI',
      //     number: payer.dni,
      //   },
      // },
      auto_return: 'approved',
      notification_url:
        'https://webhook.site/b2d5f749-94aa-4039-b036-77e8e3996dbd',
    };
    const preference = new Preference(client);

    const result = await preference.create({ body });

    return new Response(JSON.stringify({ id: result.id }), {
      status: 200,
    });
  } catch (error) {
    console.error('MercadoPago error:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
      },
    );
  }
};
