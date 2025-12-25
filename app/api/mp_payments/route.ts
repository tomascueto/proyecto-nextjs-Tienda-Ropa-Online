import { NextResponse } from "next/server"
import { createPurchase } from "@/app/lib/actions";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)

    console.log("📩 Webhook recibido:", body)

    // Si no trae lo típico, ignoramos
    if (!body || !body.data || !body.data.id) {
      console.log("❗ Webhook sin data.id")
      return NextResponse.json({ status: "ignored" }, { status: 200 })
    }

    const paymentId = body.data.id

    // 1️⃣ Consultar el pago en MP
    const res = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      }
    )

    const payment = await res.json()

    console.log("💳 Detalle del pago:", payment)

    const items = payment.additional_info?.items || []
    console.log("🛒 Items del pago:", items)
    console.log(payment.status)

    if (payment.status !== "approved") {
      console.log("⏳ Pago no aprobado, ignorado.")
      return NextResponse.json({ status: "ignored" }, { status: 200 })
    }

    const email = payment.payer?.email || "unknown"
    const totalAmount = payment.transaction_amount;


  try {
    await createPurchase(items, email, totalAmount);
  } catch (error) {
    console.error("Error creating purchase:", error);
    return Response.json(
      { success: false, error: "Failed to create purchase" },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: "success" }, { status: 200 })

  } catch (error) {
    console.error("❌ Error en webhook:", error)
    return NextResponse.json({ error: "webhook_failed" }, { status: 500 })
  }
}
