export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Términos y Condiciones</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Introducción</h2>
          <p>
            Bienvenido a TNDA. Al acceder a nuestro sitio web y utilizar nuestros servicios, 
            aceptás cumplir con los siguientes términos y condiciones. Si no estás de acuerdo 
            con alguna parte de estos términos, te rogamos que no utilices nuestros servicios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Uso del Sitio</h2>
          <p>
            Te concedemos una licencia limitada, no exclusiva e intransferible para acceder 
            y utilizar nuestro sitio web con fines personales y no comerciales. Queda prohibido 
            cualquier uso fraudulento, abusivo o ilegal del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Productos y Precios</h2>
          <p>
            Nos esforzamos por mostrar con precisión los colores y las imágenes de nuestros productos. 
            Sin embargo, no podemos garantizar que la visualización en tu monitor sea exacta. 
            Nos reservamos el derecho de modificar los precios sin previo aviso y de limitar 
            las cantidades de cualquier producto o servicio que ofrezcamos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Envíos y Devoluciones</h2>
          <p>
            Los tiempos de envío son estimados y pueden variar. Aceptamos devoluciones dentro 
            de los 30 días posteriores a la compra, siempre que el producto esté en su estado 
            original y con todas las etiquetas. Los costos de envío de la devolución corren 
            por cuenta del cliente, salvo error nuestro.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de este sitio, incluyendo textos, gráficos, logotipos, imágenes 
            y software, es propiedad de TNDA y está protegido por las leyes de derechos de autor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">6. Modificaciones</h2>
          <p>
            Podemos actualizar estos términos en cualquier momento. Te recomendamos revisar 
            esta página periódicamente para estar al tanto de cualquier cambio. El uso continuado 
            del sitio tras la publicación de cambios constituye tu aceptación de los mismos.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Última actualización: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
