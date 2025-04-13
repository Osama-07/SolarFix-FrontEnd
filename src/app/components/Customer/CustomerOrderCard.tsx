"use client";
import { OrderDetailsDTO } from "@/app/types/order";
import React, { useEffect } from "react";
import Loading from "../Shared/Loading";
import OrderStatusOverlay from "../Shared/OrderStatusOverlay";

function CustomerOrderCard(order: OrderDetailsDTO) {
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="relative h-full p-4 overflow-hidden rounded-xl bg-white">
      <div className="flex items-center">
        <div className="">
          <h1 className="text-lg text-purple-800 font-bold">
            رقـم الـطـلـب: <span className="text-black">{order.orderId}</span>
          </h1>
          <h1 className="text-lg text-purple-800 font-bold">
            الـفني: <span className="text-black">{order.technicianName}</span>
          </h1>
          <h1 className="text-lg text-purple-800 font-bold">
            البريد الالكتروني للفني:{" "}
            <span className="text-black">{order.technicianEmail}</span>
          </h1>
          <h1 className="text-lg text-purple-800 font-bold">
            سنوات الخبرة:{" "}
            <span className="text-black text-center">
              {order.experienceYears}
            </span>
          </h1>
          <h1 className="text-lg text-purple-800 font-bold">
            الـسـعـر بالسـاعـة:{" "}
            <span className="text-black text-center">
              {order.pricePerHour}$
            </span>
          </h1>
        </div>
      </div>
      <hr className="my-2" />
      <button
        className={`font-bold block w-full duration-200 cursor-pointer text-white py-2 px-5 rounded ${
          order.status.toLowerCase() === "pending"
            ? "bg-gradient-to-tl from-purple-400 to-zinc-400"
            : "bg-gradient-to-tl from-green-500 to-green-600"
        }`}
      >
        {order.status.toLowerCase() === "pending"
          ? "إنـتـظـار قـبول الـطلب"
          : order.status.toLowerCase() === "accepted"
          ? "تم  قبول الطلب"
          : "تم تنفيذ الطلب"}
      </button>
      {loading && <Loading />}
      <OrderStatusOverlay {...order} />
    </div>
  );
}

export default CustomerOrderCard;
