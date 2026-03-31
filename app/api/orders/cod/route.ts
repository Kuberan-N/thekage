import { NextResponse } from "next/server";
import { supabase } from "@/services/supabase/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderDetails } = body;

    // Save COD order to Supabase
    const { data, error } = await supabase.from("orders").insert({
      razorpay_order_id: null,
      razorpay_payment_id: null,
      razorpay_signature: null,
      customer_name: orderDetails.name,
      customer_email: orderDetails.email,
      customer_phone: orderDetails.phone,
      shipping_address: orderDetails.address,
      shipping_city: orderDetails.city,
      shipping_state: orderDetails.state,
      shipping_pincode: orderDetails.pincode,
      items: orderDetails.items,
      total_amount: orderDetails.totalAmount,
      payment_method: "cod",
      status: "confirmed",
      created_at: new Date().toISOString(),
    }).select().single();

    if (error) {
      console.error("Supabase COD order insert error:", error);
      return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      orderId: data?.id,
      message: "COD order placed successfully",
    });
  } catch (error: unknown) {
    console.error("COD order error:", error);
    const message = error instanceof Error ? error.message : "Failed to place order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
