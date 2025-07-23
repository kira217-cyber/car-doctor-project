import dbConnect, { collectionNames } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ServicesSection = async () => {
  const servicesCollection = dbConnect(collectionNames.servicesCollection);
  const servicesData = await servicesCollection.find({}).toArray();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <p className="text-red-500 font-semibold text-lg mb-2">Service</p>
        <h2 className="text-4xl font-bold mb-4">Our Service Area</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          The Majority Have Suffered Alteration In Some Form, By Injected
          Humour, Or Randomised Words Which Don’t Look Even Slightly Believable.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service) => (
          <div
            key={service._id}
            className="border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md bg-white"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <div className="flex items-center justify-between text-red-500 font-semibold">
                <p>Price : ${service.price}</p>
                <Link href={`/services/${service._id}`}>
                  <FaArrowRight className="text-red-500" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-10">
        <button className="text-red-500 font-semibold border border-red-500 px-6 py-2 rounded hover:bg-red-500 hover:text-white transition duration-300">
          More Services
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
