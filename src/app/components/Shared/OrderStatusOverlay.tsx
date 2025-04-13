"use client";
import { useUser } from "@/app/Context/UserContext";
import React, { useEffect, useRef } from "react";
import CustomerReview from "../Customer/CustomerReview";
import { OrderDetailsDTO } from "@/app/types/order";
import { useUpdateStatus } from "@/app/Context/UpdateStatusContext";

function OrderStatusOverlay(order: OrderDetailsDTO) {
  const { state } = useUser();
  const overlayRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const { orderStatus } = useUpdateStatus();
  const textRef = useRef<string>(
    order.status.toLowerCase() === "pending"
      ? "طلب جديد"
      : order.status.toLowerCase() === "accepted"
      ? "الطلب قيد التنفيذ"
      : order.status.toLowerCase() === "completed"
      ? "تم تنفيذ الطلب"
      : "لا تنسى تقيّم الرجّال"
  );
  const colorRef = useRef<string>(
    order.status.toLowerCase() === "pending"
      ? "text-purple-400"
      : order.status.toLowerCase() === "accepted"
      ? "text-yellow-400"
      : "text-green-400"
  );

  useEffect(() => {
    window.addEventListener("click", (event) => {
      if (overlayRef.current) {
        if (!overlayRef.current.contains(event.target as Node)) {
          overlayRef.current.style.opacity = "1";
        } else {
          overlayRef.current.style.opacity = "0";
        }
      }
      if (
        reviewRef.current &&
        overlayRef.current &&
        reviewRef.current.contains(event.target as Node)
      ) {
        overlayRef.current.style.opacity = "1";
      }
    });
    window.addEventListener("mousemove", (event) => {
      if (overlayRef.current) {
        if (!overlayRef.current.contains(event.target as Node)) {
          overlayRef.current.style.opacity = "1";
        } else {
          overlayRef.current.style.opacity = "0";
        }
      }
      if (
        reviewRef.current &&
        overlayRef.current &&
        reviewRef.current.contains(event.target as Node)
      ) {
        overlayRef.current.style.opacity = "1";
      }
    });
    if (order.status.toLowerCase() === "completed") {
      if (!order.isRated && state.user?.userType.toLowerCase() === "customer") {
        textRef.current = "لا تنسى تقيّم الرجّال";
      } else {
        textRef.current = "تم تنفيذ الطلب";
      }
      colorRef.current = "text-green-400";
    } else if (order.status.toLowerCase() === "accepted") {
      textRef.current = "الطلب قيد التنفيذ";
      colorRef.current = "text-yellow-400";
    } else {
      textRef.current = "طلب جديد";
      colorRef.current = "text-purple-400";
    }
  }, [order.isRated, state.user?.userType, orderStatus, order.status]);

  return (
    <div
      ref={overlayRef}
      onClick={() => {
        if (overlayRef.current) {
          if (overlayRef.current.style.opacity === "0") {
            overlayRef.current.style.opacity = "1";
          } else {
            overlayRef.current.style.opacity = "0";
          }
        }
      }}
      className={`absolute top-0 right-0 bg-black/70 backdrop-blur w-full h-full rounded-xl duration-300 ${
        !order.isRated &&
        order.status.toLowerCase() === "completed" &&
        state.user?.userType.toLowerCase() === "customer"
          ? "hover:opacity-100 mb-5"
          : "hover:opacity-0"
      }`}
    >
      <span
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl w-full font-bold ${colorRef.current} text-center `}
      >
        {textRef.current && order.status
          ? textRef.current
          : "قم بتحديث القائمة"}
        <div ref={reviewRef}>
          {!order.isRated &&
            order.status.toLowerCase() === "completed" &&
            state.user?.userType.toLowerCase() === "customer" && (
              <CustomerReview {...order} />
            )}
        </div>
      </span>
    </div>
  );
}

export default OrderStatusOverlay;
