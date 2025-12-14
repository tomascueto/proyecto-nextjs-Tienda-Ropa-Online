**Análisis de la situación actual:**

1.  **Recepción de notificaciones (Backend):**
    *   **Sí, está contemplado.** Existe el archivo `app/api/mp_payments/route.ts` que actúa como el "Webhook Listener".
    *   Este archivo implementa correctamente el flujo seguro recomendado por Mercado Pago:
        1.  Recibe la notificación (POST).
        2.  Verifica que sea de tipo `payment`.
        3.  Obtiene el ID del pago (`data.id`).
        4.  **Consulta a la API de Mercado Pago** para obtener el estado real del pago (evitando fraudes por notificaciones falsas).
        5.  Si el estado es `approved`, llama a `createPurchase` para registrar la compra en la base de datos.

2.  **Configuración del envío (Acción requerida):**
    *   En el archivo `app/lib/actions.ts`, dentro de la función `payment`, se crea la preferencia de pago.
    *   Actualmente se definen las `back_urls` (para el usuario), pero **falta definir la `notification_url`**.
    *   Sin esta línea, Mercado Pago no sabe a dónde enviar la notificación (a menos que lo tengas configurado globalmente en el panel de MP, pero es buena práctica ponerlo explícitamente en el código).

**Plan de Implementación:**

1.  **Modificar `app/lib/actions.ts`**:
    *   Agregar el campo `notification_url` al objeto de configuración de la preferencia en la función `payment`.
    *   La URL será: `https://proyecto-nextjs-tienda-ropa-online.vercel.app/api/mp_payments` (siguiendo el dominio que ya estás usando en las `back_urls`).

**Nota importante para pruebas locales:**
Dado que las notificaciones de Mercado Pago son de servidor a servidor, si estás probando en `localhost`, MP no podrá llegar a tu máquina. Para probar esto localmente necesitarías usar una herramienta como `ngrok` o confiar en que funcionará cuando despliegues a Vercel. Por ahora, dejaremos configurada la URL de producción que ya tienes en el código.