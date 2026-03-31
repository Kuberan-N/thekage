import crypto from "crypto";
import { NextResponse } from "next/server";
import { supabase } from "@/services/supabase/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = body;

    // 1. Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // 2. Save order to Supabase
    const { data, error } = await supabase.from("orders").insert({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer_name: orderDetails.name,
      customer_email: orderDetails.email,
      customer_phone: orderDetails.phone,
      shipping_address: orderDetails.address,
      shipping_city: orderDetails.city,
      shipping_state: orderDetails.state,
      shipping_pincode: orderDetails.pincode,
      items: orderDetails.items,
      total_amount: orderDetails.totalAmount,
      payment_method: "razorpay",
      status: "confirmed",
      created_at: new Date().toISOString(),
    }).select().single();

    if (error) {
      console.error("Supabase order insert error:", error);
      // Payment was verified even if DB insert fails — don't return error
      // Just log it for debugging
    }

    return NextResponse.json({
      success: true,
      orderId: data?.id || razorpay_order_id,
      message: "Payment verified successfully",
    });
  } catch (error: unknown) {
    console.error("Payment verification error:", error);
    const message = error instanceof Error ? error.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
