import MoyasarForm from "@/components/payments/MoyasarForm";
import React from "react";

const Checout = ({params}: {params: Promise<{
    amount: number,
    email: string
}>}) => {
  return (
    <main>
      <MoyasarForm amount={662.05} email="aymnzayd120@gmail.com" />
    </main>
  );
};

export default Checout;
