"use server";

import { MoyasarPaymentResponse } from "@/app/types/moyasar";


export async function verifyPayment(paymentId: string) {
  const SECRET_KEY = process.env.MOYASAR_SECRET_KEY;

  if (!SECRET_KEY) {
    throw new Error("Moyasar Secret Key is missing");
  }

  try {
    const response = await fetch(`https://api.moyasar.com/v1/payments/${paymentId}`, {
      headers: {
        // ميسر تستخدم Basic Auth: يوضع الـ Secret Key كمستخدم وبدون كلمة سر
        Authorization: `Basic ${Buffer.from(SECRET_KEY + ":").toString("base64")}`,
      },
      cache: 'no-store'
    });

    const data: MoyasarPaymentResponse = await response.json();
    
    if (data.status === 'paid') {
      // هنا تضع منطق تحديث قاعدة البيانات الخاص بك
      // مثل: updateOrderInDB(data.id)
      return { success: true, data };
    }

    return { success: false, message: data.source.message || "Payment failed" };
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return { success: false, message: "Internal Server Error" };
  }
}