"use client";
import React, { useEffect, useState } from "react";
import { OrderDetailsDTO } from "../../types/order";
import { useUser } from "../../Context/UserContext";
import { AxiosResponse } from "axios";
import axiosInstance from "../../lib/axios";
import Loading from "../Shared/Loading";
import CustomerOrderCard from "./CustomerOrderCard";
import { useUpdateStatus } from "@/app/Context/UpdateStatusContext";

function CustomerOrdersList() {
  const [loading, setLoading] = useState(false);
  const { orderStatus } = useUpdateStatus();
  const [orders, setOrders] = useState<OrderDetailsDTO[]>([]);
  const { state } = useUser();
  const userId = state.user?.userId;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse = await axiosInstance.get(
        `/Order/CustomerOrders/${userId}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب الطلبات:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [orderStatus]);

  return (
    <div className="my-10 mx-5 lg:mx-28 bg-white rounded-2xl p-5">
      <div className="flex justify-between items-center">
        <h1 className="mb-2 text-3xl text-purple-800 font-bold text-right">
          طـلـبـاتي
        </h1>
        <button
          className="mb-2 w-fit font-bold block duration-200 cursor-pointer hover:bg-purple-700 bg-purple-800 text-white py-2 px-5 rounded-lg"
          onClick={fetchOrders}
        >
          تحديث
        </button>
      </div>
      <div
        className={`min-h-48 relative p-5 overflow-hidden ${
          orders.length > 0
            ? "grid grid-cols-3 gap-5 max-md:grid-cols-1 max-xl:grid-cols-2"
            : "flex justify-center items-center"
        } rounded-xl bg-zinc-300`}
      >
        {orders.length > 0 ? (
          orders
            .slice()
            .reverse()
            .map((order) => (
              <div key={order.orderId}>
                <CustomerOrderCard {...order} />
              </div>
            ))
        ) : (
          <div className="m-auto">
            <h1 className="text-4xl text-purple-800 font-bold">
              لا توجد طلبات
            </h1>
            <button
              className="block m-auto w-fit font-bold mt-5 duration-200 cursor-pointer hover:bg-purple-700 bg-purple-800 text-white py-2 px-5 rounded-lg"
              onClick={fetchOrders}
            >
              تحديث
            </button>
          </div>
        )}
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default CustomerOrdersList;
