"use client";
import { OrderDetailsDTO } from "@/app/types/order";
import { IconContainerProps, Rating } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { ReviewRequestDTO } from "@/app/types/review";
import axios from "axios";
import axiosInstance from "@/app/lib/axios";
import { useUpdateStatus } from "@/app/Context/UpdateStatusContext";

const StyledRating = styled(Rating)(() => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: "white",
    fontSize: 50,
  },
  "& .MuiRating-iconFilled .MuiSvgIcon-root": {
    fontSize: 50,
  },
  "& .MuiRating-icon:hover": {
    transform: "scale(1.2)", // تعديل حجم الأيقونة أثناء الـ hover
  },
  "& .MuiRating-iconActive": {
    transform: "scale(1.2)", // تكبير الأيقونة المحددة أثناء التقييم
  },
  "&.MuiRating-root": {
    direction: "ltr", // إجبار اتجاه الأيقونات لتكون من اليسار لليمين
  },
}));

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

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

function CustomerReview(order: OrderDetailsDTO) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setOrderStatus } = useUpdateStatus();
  const [rateNumber, setRateNumber] = React.useState<number | null>(0);
  const [review, setReview] = React.useState<ReviewRequestDTO>({
    reviewId: 0,
    orderId: 0,
    rating: 0,
    comment: "",
  });

  async function handleReview(): Promise<void> {
    setLoading(true);

    try {
      await axiosInstance.post("/Review", {
        ReviewId: review.reviewId,
        OrderId: order.orderId,
        Rating: review.rating,
        Comment: review.comment,
      });
      setOrderStatus("rated");
      alert("تم تقييمك بنجاح");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert("حدث خطأ، يرجى المحاولة في وقت لاحق");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-5">
      <StyledRating
        name="highlight-selected-only"
        value={rateNumber ?? 0}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
        onChange={(event, newValue) => {
          if (newValue === null) return;
          setRateNumber(newValue);
          setReview((prevReview) => ({ ...prevReview, rating: newValue }));
        }}
      />
      <button
        className={` block text-xl w-fit mx-auto duration-200 rounded-xl bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 mt-2 font-bold ${
          loading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={handleReview}
      >
        {loading ? "جار التحميل..." : "تـأكيد"}
      </button>
    </div>
  );
}

export default CustomerReview;
