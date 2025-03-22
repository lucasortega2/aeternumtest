import type { APIRoute } from 'astro';
import crypto from 'node:crypto';

export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
  const body = await request.json();

  const xSignature = request.headers.get('x-signature');
  const xRequestId = request.headers.get('x-request-id');

  // Asegurarse de obtener el ID y convertirlo a minúsculas si es alfanumérico
  const dataID1 = url.searchParams.get('id')?.toLowerCase();
  const dataID2 = url.searchParams.get('data.id')?.toLowerCase();
  const dataIDLower = dataID1 || dataID2;

  console.log(url.searchParams);

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

  // Validar que tenemos todos los datos necesarios
  if (!ts || !hash || !xRequestId) {
    console.log('Faltan datos en la notificación');
    return new Response('Bad Request', { status: 400 });
  }

  // Generar el manifest
  const manifest = `id:${dataIDLower};request-id:${xRequestId};ts:${ts};`;
  console.log('Manifest:', manifest);

  // Usar la clave secreta (asegúrate de que esté configurada correctamente)
  const secret = import.meta.env.SECRET_KEY_MP;
  if (!secret) {
    console.log('Falta la clave secreta en las variables de entorno');
    return new Response('Server Error', { status: 500 });
  }

  // Crear el HMAC
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(manifest);
  const sha = hmac.digest('hex');

  console.log('Generated SHA:', sha);
  console.log('Received HASH:', hash);

  if (sha === hash) {
    console.log('HMAC verification passed');
    return new Response('OK', { status: 200 });
  } else {
    console.log('HMAC verification failed');
    return new Response('Failed', { status: 403 });
  }
};
