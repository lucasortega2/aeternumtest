import { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCartStore } from '@/stores/cartStore';
import { z } from 'astro/zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AeternumLoadingButton from './AeternumLoadingButton';

// Esquema de validación con zod
export const checkoutFormSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre es requerido y debe tener al menos 3 caracteres',
  }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(6, { message: 'El teléfono es requerido' }),
  address: z.string().min(5, { message: 'La dirección es requerida' }),
  province: z.string().min(2, { message: 'La provincia es requerida' }),
  city: z.string().min(2, { message: 'La ciudad es requerida' }),
  postalCode: z.string().min(3, { message: 'El código postal es requerido' }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutPage = () => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });
  const { items, totalItems, totalPrice } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      province: '',
      city: '',
      postalCode: '',
    },
  });

  useEffect(() => {
    initMercadoPago(import.meta.env.PUBLIC_KEY_MP, {
      locale: 'es-AR',
    });
  }, []);

  const createPreference = async (data: CheckoutFormValues) => {
    setLoading(true);
    if (items.length === 0) {
      setError({ error: true, message: 'No hay productos en el carrito' });
      return;
    }

    try {
      const response = await fetch('/api/createPreference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            title: item.name,
            quantity: Number(item.quantity),
            unit_price: Number(item.price),
            currency_id: 'ARS',
          })),
          payer: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            postal_code: data.postalCode,
            province: data.province,
          },
        }),
      });

      const result = await response.json();

      if (result.success == false) {
        setError({
          error: true,
          message: 'Ocurrió un error al procesar el pago',
        });
        return;
      }
      setError({ error: false, message: '' });
      setPreferenceId(result.id);
    } catch (error) {
      setError({
        error: true,
        message: 'Error de conexión con el servidor',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR');
  };

  return (
    <div className="bg-aeternum-black text-white h-max px-12 pb-12 mt-12 rounded-2xl shadow-lg">
      <div className="container mx-auto p-4 max-w-6xl ">
        <h1 className="text-4xl font-bold mb-12 mt-4 text-center text-aeternum-accent">
          Finalizar Compra
        </h1>
        {error.error && (
          <p className="text-red-500 text-center text-lg mb-8">
            {error.message}
          </p>
        )}
        {/* Información de Envío */}
        <form
          onSubmit={handleSubmit(createPreference)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 "
        >
          <div className="bg-aeternum-medium p-8 rounded-2xl shadow-inner space-y-6">
            <h2 className="text-2xl font-semibold mb-6 text-aeternum-highlight">
              Información de Envío
            </h2>

            {/* Nombre completo */}
            <div>
              <label htmlFor="name" className="block mb-2 text-aeternum-silver">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full bg-aeternum-light border border-aeternum-dark rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-aeternum-accent"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-aeternum-silver"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full bg-aeternum-light border border-aeternum-dark rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-aeternum-accent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-aeternum-silver"
              >
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className="w-full bg-aeternum-light border border-aeternum-dark rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-aeternum-accent"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Dirección */}
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-aeternum-silver"
              >
                Dirección
              </label>
              <input
                type="text"
                id="address"
                {...register('address')}
                className="w-full bg-aeternum-light border border-aeternum-dark rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-aeternum-accent"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Ciudad y Provincia */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-aeternum-silver"
                >
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  {...register('city')}
                  className="w-full bg-aeternum-light border border-aeternum-dark rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-aeternum-accent"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="province"
                  className="block mb-2 text-aeternum-silver"
                >
                  Provincia
                </label>
                <input
                  type="text"
                  id="province"
                  {...register('province')}
                  className="w-full bg-aeternum-light border border-aeternum-dark rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-aeternum-accent"
                />
                {errors.province && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.province.message}
                  </p>
                )}
              </div>
            </div>

            {/* Código Postal */}
            <div>
              <label
                htmlFor="postalCode"
                className="block mb-2 text-aeternum-silver"
              >
                Código Postal
              </label>
              <input
                type="text"
                id="postalCode"
                {...register('postalCode')}
                className="w-full bg-aeternum-light border border-aeternum-dark rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-aeternum-accent"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Resumen del carrito */}
          <div className="bg-aeternum-medium p-8 rounded-2xl shadow-inner space-y-6 h-max">
            <h2 className="text-2xl font-semibold mb-6 text-aeternum-highlight">
              Resumen del Pedido
            </h2>

            <ul className="divide-y divide-aeternum-dark">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between py-4">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="text-right mt-6">
              <p className="text-lg">Total ({totalItems} items):</p>
              <p className="text-3xl font-bold text-aeternum-accent">
                ${formatPrice(totalPrice)}
              </p>
            </div>
            {!preferenceId ? (
              <AeternumLoadingButton isLoading={loading} disabled={loading}>
                Generar Pago
              </AeternumLoadingButton>
            ) : (
              <div className="mt-8">
                <Wallet
                  initialization={{ preferenceId }}
                  customization={{
                    texts: { valueProp: 'smart_option' },
                    visual: {
                      buttonBackground: 'black',
                    },
                  }}
                  onReady={() => console.log('success')}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
