"use client";

import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ data }) => {
  const { data: session } = useSession();

  const handleBookService = async (e) => {
    toast("Submitting Booking...");
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const email = form.email.value;

    const bookingPayload = {
      customerName: name,
      email,
      date,
      phone,
      address,
      service_id: data._id,
      service_name: data.title,
      service_img: data.img,
      service_price: data.price,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) throw new Error("Failed to book service");

      const postedResponse = await res.json();
      toast.success("Booking Confirmed!");
      console.log("POSTED DATA", postedResponse);
    } catch (error) {
      console.error(error);
      toast.error("Booking Failed!");
    }
  };

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl p-6 md:p-10 rounded-xl border border-gray-200">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-primary">
          Book Service: <span className="text-secondary">{data?.title}</span>
        </h2>

        <form onSubmit={handleBookService}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={session?.user?.name}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={session?.user?.email}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            {/* Price */}
            <div>
              <label className="label">
                <span className="label-text">Due Amount</span>
              </label>
              <input
                type="text"
                name="price"
                defaultValue={data?.price}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            {/* Date */}
            <div>
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="label">
                <span className="label-text">Present Address</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <button type="submit" className="btn btn-primary btn-block text-lg">
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
