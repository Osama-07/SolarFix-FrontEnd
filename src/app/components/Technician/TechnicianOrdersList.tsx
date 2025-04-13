"use client";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { OrderDetailsDTO } from "../../types/order";
import { useUser } from "../../Context/UserContext";
import TechnicianOrderCard from "./TechnicianOrderCard";
import Loading from "../Shared/Loading";

function TechnicianOrdersList() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderDetailsDTO[]>([]);
  const { state } = useUser();
  const userId = state.user?.userId;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse = await axiosInstance.get(
        `/Order/TechnicianOrders/${userId}`
      );
      if (response.status === 200 && response.data) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء جلب الطلبات:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusOrder = async (order: OrderDetailsDTO) => {
    setLoading(true);

    let action: string = ""; // SetAccepted Or SetCompleted

    if (order.status.toLowerCase() === "pending") {
      action = "SetAccepted";
    } else if (order.status.toLowerCase() === "accepted") {
      action = "SetCompleted";
    }

    try {
      const response: AxiosResponse = await axiosInstance.put(
        `/Order/${action}/${order.orderId}`,
        {
          Status: status,
        }
      );
      if (response.status >= 200 || response.status < 300) {
        alert("تم تحديث حالة الطلب بنجاح");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert("لم يتم تحديث حالة الطلب، حاول مرة اخرى");
      }
    } finally {
      setLoading(false);
    }
    fetchOrders();
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, []);

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
              <div
                key={order.orderId}
                className="relative p-4 overflow-hidden rounded-xl bg-white"
              >
                <TechnicianOrderCard {...order} />
                <button
                  className={`font-bold block w-full duration-200 cursor-pointer text-white py-2 px-5 rounded ${
                    order.status.toLowerCase() === "pending"
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  onClick={() => handleStatusOrder(order)}
                >
                  {loading
                    ? "جـاري القبول"
                    : order.status.toLowerCase() === "pending"
                    ? "قـبول"
                    : order.status.toLowerCase() === "accepted"
                    ? "إكمال وإغلاق الطلب"
                    : "تم تنفيذ الطلب"}
                </button>
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

export default TechnicianOrdersList;
