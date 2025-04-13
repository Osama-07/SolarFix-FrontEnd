import React from "react";
import axios, { AxiosResponse } from "axios";
import { useUser } from "@/app/Context/UserContext";
import Loading from "../Shared/Loading";
import axiosInstance from "@/app/lib/axios";
import { Technician } from "@/app/types/technician";
import { useUpdateStatus } from "@/app/Context/UpdateStatusContext";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const customIcons: {
  [index: number]: {
    icon: React.ReactElement<unknown>;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function TechnicianCard(technician: Technician) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setOrderStatus } = useUpdateStatus();
  const { state } = useUser();

  async function handleReservation(
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);
    try {
      const response: AxiosResponse = await axiosInstance.post("/Order", {
        OrderId: 0,
        TechnicianId: technician.technicianId,
        CustomerId: state.user?.userId,
      });
      if (response.status >= 200 || response.status < 300) {
        alert("تم حجزك بنجاح ، سيتم التواصل معك في أقرب وقت");
        setOrderStatus("pending"); // for refresh the orders list.
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert("لديك طلب بالفعل");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative h-full p-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div className="p-3 ml-5 rounded-full bg-black w-14 h-14">
          <img src="/vercel.svg" alt="" loading="lazy" />
        </div>
        <div className="">
          <h1 className="text-lg text-purple-800 font-bold">
            {technician.fullName}
          </h1>
          <p className="text-sm ml-2 text-gray-500">{technician.email}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            {customIcons[Math.round(technician.rating)]?.icon}
            <span
              className={`block font-bold max-sm:text-xs ${
                Math.round(technician.rating) === 1
                  ? "text-red-600"
                  : Math.round(technician.rating) === 2
                  ? "text-red-600"
                  : Math.round(technician.rating) === 3
                  ? "text-yellow-600"
                  : Math.round(technician.rating) === 4
                  ? "text-green-600"
                  : Math.round(technician.rating) === 5
                  ? "text-green-600"
                  : ""
              } } } }`}
            >
              {customIcons[Math.round(technician.rating)]?.label ===
              "Very Satisfied"
                ? "جدًا ممتاز"
                : customIcons[Math.round(technician.rating)]?.label ===
                  "Satisfied"
                ? "ممتاز"
                : customIcons[Math.round(technician.rating)]?.label ===
                  "Neutral"
                ? "متوسط"
                : customIcons[Math.round(technician.rating)]?.label ===
                  "Dissatisfied"
                ? "سـيّئ"
                : "سـيّئ جدًا"}
            </span>
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <button
        className="font-bold block w-full duration-200 cursor-pointer hover:bg-purple-700 bg-purple-800 text-white py-2 px-5 rounded"
        onClick={handleReservation}
      >
        حــجـز
      </button>
      {loading && <Loading />}
    </div>
  );
}

export default TechnicianCard;
