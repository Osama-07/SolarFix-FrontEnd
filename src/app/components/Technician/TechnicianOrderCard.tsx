import React, { useEffect } from "react";
import { OrderDetailsDTO } from "@/app/types/order";
import Loading from "../Shared/Loading";
import OrderStatusOverlay from "../Shared/OrderStatusOverlay";

function TechnicianOrderCard(order: OrderDetailsDTO) {
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <div className="">
          <h1 className="text-lg text-purple-800 font-bold">
            رقـم الـطـلـب: <span className="text-black">{order.orderId}</span>
          </h1>
          <h1 className="text-lg text-purple-800 font-bold">
            العميـل: <span className="text-black">{order.customerName}</span>
          </h1>
          <h1 className="text-lg text-purple-800 font-bold">
            البريد الالكتروني للـعميل:{" "}
            <span className="text-black">{order.customerEmail}</span>
          </h1>
          <h1 className="text-lg text-purple-800 font-bold">
            تـاريخ الطلب:{" "}
            <span className="text-black text-center">
              {order.createdAt.toString().slice(0, 10)}
            </span>
          </h1>
        </div>
      </div>
      <hr className="my-2" />
      {loading && <Loading />}
      {order.status.toLowerCase() === "completed" && (
        <OrderStatusOverlay {...order} />
      )}
    </div>
  );
}

export default TechnicianOrderCard;
