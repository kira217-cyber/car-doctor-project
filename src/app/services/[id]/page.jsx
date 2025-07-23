import React from "react";
import Image from "next/image";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import banner from "../../../../public/assets/images/banner/1.jpg";

export const dynamic = "force-dynamic";

const page = async ({ params }) => {
  const p = params;
  const servicesCollection = dbConnect(collectionNames.servicesCollection);

  const service = await servicesCollection.findOne({ _id: new ObjectId(p.id) });

  return (
    <div className="px-4 md:px-10 py-8 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-[350px] xl:h-[400px] rounded-lg overflow-hidden mb-10 border border-blue-400">
        <Image
          src={banner}
          alt="Service Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Service Details
          </h2>
          <p className="mt-2 text-sm sm:text-base text-orange-400 font-medium">
            Home / Service Details
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Service Content */}
        <div className="md:col-span-2 space-y-6">
          <Image
            src={service.img}
            alt={service.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
          />

          <h2 className="text-2xl font-bold">{service.title}</h2>
          <p className="text-gray-600">{service.description}</p>

          {/* Facilities */}
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            {service.facility.map((item, index) => (
              <div
                key={index}
                className="border-l-4 border-orange-500 bg-gray-50 p-4 rounded shadow-sm"
              >
                <h4 className="text-lg font-semibold mb-1">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.details}</p>
              </div>
            ))}
          </div>

          {/* Process Steps */}
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">
              3 Simple Steps to Process
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className="text-center p-4 bg-white shadow rounded"
                >
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    0{step}
                  </div>
                  <h4 className="font-semibold mb-1">STEP {step}</h4>
                  <p className="text-gray-600 text-sm">
                    It uses a dictionary of over 200 Latin words...
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Video */}
          <div className="mt-8">
            <Image
              src="https://i.ibb.co/zZ6w1kB/video.jpg"
              alt="Video"
              width={800}
              height={400}
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-6">
          {/* Service List */}
          <div className="bg-white shadow p-4 rounded">
            <h4 className="text-lg font-bold mb-3">Services</h4>
            <ul className="space-y-2">
              {[
                "Full Car Repair",
                "Engine Repair",
                "Automatic Service",
                "Engine Oil Change",
                "Battery Change",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className={`cursor-pointer hover:text-orange-500 ${
                    item === service.title
                      ? "text-orange-500 font-semibold"
                      : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Download Box */}
          <div className="bg-black text-white p-4 rounded">
            <h4 className="text-lg font-bold mb-2">Download</h4>
            <button className="bg-orange-500 px-4 py-2 rounded text-sm font-semibold">
              Download Brochure
            </button>
          </div>

          {/* Support Box */}
          <div className="bg-white shadow p-4 rounded text-center">
            <h4 className="text-lg font-bold mb-1">Car Doctor</h4>
            <p className="text-sm mb-3">Need Help? We Are Here To Help You</p>
            <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm font-semibold">
              Get A Quote
            </button>
          </div>

          {/* Price Box */}
          <div className="bg-white shadow p-4 rounded text-center">
            <p className="text-lg font-bold mb-2">Price: ${service.price}</p>
            <button className="bg-orange-500 text-white w-full py-2 rounded font-semibold hover:bg-orange-600 transition">
              Proceed Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
