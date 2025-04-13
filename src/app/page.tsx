"use client";
import React from "react";
import Header from "./components/Header";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/navigation";
import Customer from "./customer/page";
import Technician from "./technician/page";
import UpdateStatusProvider from "./Context/UpdateStatusContext";

export default function Home() {
  const { state, dispatch } = useUser();
  const router = useRouter();

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  }
  return (
    <div className="relative h-screen">
      <Header />
      <UpdateStatusProvider>
        {state.user?.userType?.toLowerCase() === "customer" && <Customer />}
        {state.user?.userType?.toLowerCase() === "technician" && <Technician />}
      </UpdateStatusProvider>
      <button
        className="fixed right-0 bottom-0 mr-5 mb-5 rounded-full duration-200 hover:bg-purple-700 hover:scale-105 cursor-pointer bg-purple-800 text-white px-4 py-2 mt-4 font-bold"
        onClick={handleLogout}
      >
        تسجيل خروج
      </button>
      {!state.isAuthenticated && (
        <div className="absolute left-0 top-0 w-full h-full bg-black/50 backdrop-blur-2xl">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-center text-white text-4xl font-bold">
              انتهت صلاحية تسجيل الدخول
            </h1>
            <button
              className="mt-10 text-center bg-purple-800 px-5 py-4 text-white text-2xl font-bold rounded-2xl duration-200 hover:bg-purple-700 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              الذهاب لصفحة تسجيل الدخول
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
