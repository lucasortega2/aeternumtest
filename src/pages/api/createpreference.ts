import type { APIRoute } from 'astro';

import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales

export const GET: APIRoute = async ({ params, request }) => {
  console.log(params);
  console.log(request);

  const client = new MercadoPagoConfig({
    accessToken: import.meta.env.ACCESS_TOKEN_MP,
  });

  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: 'hola',
            title: 'Mi producto',
            quantity: 1,
            unit_price: 2000,
            currency_id: 'ARS',
          },
        ],
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  return new Response(JSON.stringify({ message: 'ok' }));
};
