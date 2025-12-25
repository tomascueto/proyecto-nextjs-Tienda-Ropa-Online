export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Qué información recopilamos</h2>
          <p>
            Recopilamos información personal que nos proporcionás voluntariamente, como tu nombre, 
            dirección de correo electrónico, dirección de envío y datos de pago cuando realizás 
            una compra o te registrás en nuestro sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Cómo usamos tu información</h2>
          <p>
            Utilizamos tu información para procesar tus pedidos, comunicarnos con vos sobre el 
            estado de tu compra, y enviarte novedades o promociones si aceptaste recibirlas. 
            No vendemos ni alquilamos tu información personal a terceros.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Cookies y Tecnologías Similares</h2>
          <p>
            Usamos cookies para mejorar tu experiencia de navegación, recordar tus preferencias 
            y analizar el tráfico de nuestro sitio. Podés configurar tu navegador para rechazar 
            las cookies, aunque esto podría limitar algunas funcionalidades del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Seguridad de los Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos 
            personales contra el acceso no autorizado, la pérdida o la alteración. Sin embargo, 
            ningún método de transmisión por Internet es 100% seguro.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Tus Derechos</h2>
          <p>
            Tenés derecho a acceder, corregir o eliminar tu información personal en cualquier 
            momento. Si deseás ejercer estos derechos, por favor contactanos a través de nuestro 
            correo de soporte.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">6. Cambios en esta Política</h2>
          <p>
            Podemos actualizar nuestra política de privacidad ocasionalmente. Te notificaremos 
            cualquier cambio importante publicando la nueva política en esta página.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Última actualización: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
