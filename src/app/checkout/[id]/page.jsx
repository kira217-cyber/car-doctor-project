import CheckoutForm from "@/components/forms/CheckoutForm";
import React from "react";

export default async function CheckoutPage({ params }) {
  const p = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/service/${p.id}`
  );

  const data = await res.json();
  return (
    <div>
      <CheckoutForm data={data} />
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
