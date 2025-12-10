import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

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

    if (payment.status !== "approved") {
      console.log("⏳ Pago no aprobado, ignorado.")
      return NextResponse.json({ status: "ignored" }, { status: 200 })
    }

    // 2️⃣ Datos del comprador
    const email = payment.payer?.email || "unknown"

    // 3️⃣ Items (vendrán del array de MP)
    const items = payment.additional_info?.items || []

    // 4️⃣ Guardar en la tabla purchase
    const purchaseResult = await sql`
      INSERT INTO purchase (buyerEmail, totalCost, status)
      VALUES (${email}, ${payment.transaction_amount}, 'completed')
      RETURNING purchaseid
    `

    const purchaseId = purchaseResult.rows[0].purchaseid

    // 5️⃣ Guardar detalles por cada producto
    for (const item of items) {
      await sql`
        INSERT INTO purchaseDetail (purchase_id, productName, quantity, unitCost)
        VALUES (
          ${purchaseId},
          ${item.title},
          ${item.quantity},
          ${item.unit_price}
        )
      `
    }

    console.log("✅ Compra registrada:", purchaseId)

    return NextResponse.json({ status: "success" }, { status: 200 })
  } catch (error) {
    console.error("❌ Error en webhook:", error)
    return NextResponse.json({ error: "webhook_failed" }, { status: 500 })
  }
}
