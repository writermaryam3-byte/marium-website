"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { verifyPayment } from "@/server/_actions/payment";

// تعريف الواجهة لـ Moyasar Window object
declare global {
  interface Window {
    Moyasar: any;
  }
}

interface Props {
  amount: number; // المبلغ بالريال
  email: string;
}

export default function MoyasarForm({ amount, email }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. إعداد دالة رد الفعل عند انتهاء الدفع
    const onCompleted = async (payment: any) => {
      // استدعاء الـ Server Action للتحقق من العملية
      const result = await verifyPayment(payment.id);
      
      if (result.success) {
        router.push(`/success?id=${payment.id}`);
      } else {
        alert("فشلت عملية الدفع: " + result.message);
      }
    };

    // 2. تهيئة ميسر
    if (window.Moyasar) {
      window.Moyasar.init({
        element: formRef.current,
        amount: Math.round(amount * 100), // تحويل لريال لهللة
        currency: "SAR",
        description: `Order for ${email}`,
        publishable_api_key: process.env.NEXT_PUBLIC_MOYASAR_PUBLIC_KEY,
        methods: ["creditcard", "applepay"],
        on_completed: onCompleted, // استخدام الـ Callback بدلاً من الرابط المباشر إذا أردت
      });
    }
  }, [amount, email, router]);

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      <link rel="stylesheet" href="https://cdn.moyasar.com/mpf/1.13.0/moyasar.css" />
      <script src="https://cdn.moyasar.com/mpf/1.13.0/moyasar.js" async></script>
      
      <h2 className="text-black text-center mb-4 font-bold">إتمام الدفع الآمن</h2>
      <div ref={formRef}></div>
    </div>
  );
}