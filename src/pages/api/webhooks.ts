export const POST: APIRoute = async ({ request, url }) => {
  // Devolvemos 200 rápido
  const response = new Response('OK', { status: 200 });

  // Luego procesás en segundo plano, por ejemplo:
  (async () => {
    try {
      const body = await request.json();

      const xSignature = request.headers.get('x-signature');
      const xRequestId = request.headers.get('x-request-id');

      const dataID1 = url.searchParams.get('id')?.toLowerCase();
      const dataID2 = url.searchParams.get('data.id')?.toLowerCase();
      const dataIDLower = dataID1 || dataID2;

      const parts = xSignature?.split(',');
      let ts: string | undefined;
      let hash: string | undefined;

      parts?.forEach((part) => {
        const [key, value] = part.split('=');
        if (key && value) {
          const trimmedKey = key.trim();
          const trimmedValue = value.trim();
          if (trimmedKey === 'ts') {
            ts = trimmedValue;
          } else if (trimmedKey === 'v1') {
            hash = trimmedValue;
          }
        }
      });

      if (!ts || !hash || !xRequestId) {
        console.log('Faltan datos en la notificación');
        return;
      }

      const manifest = `id:${dataIDLower};request-id:${xRequestId};ts:${ts};`;
      console.log('Manifest:', manifest);

      const secret = import.meta.env.SECRET_KEY_MP;
      if (!secret) {
        console.log('Falta la clave secreta en las variables de entorno');
        return;
      }

      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(manifest);
      const sha = hmac.digest('hex');

      console.log('Generated SHA:', sha);
      console.log('Received HASH:', hash);

      if (sha === hash) {
        console.log('HMAC verification passed');
        // Aquí deberías procesar el evento: actualizar tu base de datos, etc.
      } else {
        console.log('HMAC verification failed');
      }
    } catch (err) {
      console.error('Error al procesar el webhook:', err);
    }
  })();

  return response;
};
