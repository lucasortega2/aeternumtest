export const prerender = false;

export const GET = async () => {
  const response = await fetch(
    'https://api.mercadopago.com/v1/payment_methods',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.ACCESS_TOKEN_MP}`,
      },
    },
  );
  const data = await response.json();
  return new Response(JSON.stringify(data));
};
