"use client";
import React, { useEffect } from "react";
import { Technician } from "../../types/technician";
import axiosInstance from "../../lib/axios";
import { AxiosResponse } from "axios";
import TechnicianCard from "./TechnicianCard";
import Loading from "../Shared/Loading";

function TechniciansList() {
  const [loading, setLoading] = React.useState(false);
  const [technicians, setTechnicians] = React.useState<Technician[]>([]);

  async function fetchTechnicians() {
    setLoading(true);
    try {
      const response: AxiosResponse = await axiosInstance.get("/Technician");
      if (response.status === 200) {
        setTechnicians(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTechnicians();
  }, []);

  return (
    <div className="my-10 mx-5 lg:mx-28 bg-white rounded-2xl p-5">
      <div className="flex justify-between items-center">
        <h1 className="mb-2 text-3xl text-purple-800 font-bold text-right">
          الفـنـيّـيـن
        </h1>
        <button
          className="mb-2 w-fit font-bold block duration-200 cursor-pointer hover:bg-purple-700 bg-purple-800 text-white py-2 px-5 rounded-lg"
          onClick={fetchTechnicians}
        >
          تحديث
        </button>
      </div>
      <div
        className={`min-h-48 relative p-5 overflow-hidden ${
          technicians.length > 0
            ? "grid grid-cols-3 gap-5 max-md:grid-cols-1 max-xl:grid-cols-2"
            : "flex justify-center items-center"
        } rounded-xl bg-zinc-300`}
      >
        {technicians.length > 0 ? (
          technicians.map((technician) => (
            <div key={technician.technicianId}>
              <TechnicianCard {...technician} />
            </div>
          ))
        ) : (
          <h1 className="text-4xl text-purple-800 font-bold text-center">
            لا يوجد فنيين
          </h1>
        )}
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default TechniciansList;
