"use client";
import { InputLabel, MenuItem, Select, styled } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import axiosInstance from "../lib/axios";

const CustomMenuItem = styled(MenuItem)({
  fontFamily: "Cairo, sans-serif",
  fontSize: "15px",
  color: "white",
  backgroundColor: "#364153",
  transitionDuration: "0.2s",
  "&:hover": {
    backgroundColor: "#ad46ff",
  },
  "&.Mui-selected": {
    backgroundColor: "#ad46ff",
  },
});
function SignUp() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  // UserInfo.
  const [fullName, setFullName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [rePassword, setRePassword] = React.useState<string>("");
  const [userType, setUserType] = React.useState<number>(1); // 1 for Customer | 0 for Technician
  // Technician Info.
  const [experienceYears, setExperienceYears] = React.useState<number>(0);
  const [pricePerHour, setPricePerHour] = React.useState<number>(0);

  const handleSignUp = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    if (rePassword !== password) {
      alert("كلمة المرور غير متطابقة");
      return;
    }

    try {
      const response: AxiosResponse = await axiosInstance.post("/SignUp", {
        FullName: fullName,
        Email: email,
        Phone: phone,
        Password: password,
        RePassword: rePassword,
        UserType: userType,
        ExperienceYears: experienceYears,
        PricePerHour: pricePerHour,
      });
      if (response.status >= 200 || response.status < 300) {
        alert("تم تسجيلك بنجاح");
        router.push("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert("يوجد حساب بهذا البريد الألكتروني");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full py-20 bg-gradient-to-b from-purple-800 via-purple-900 to-black">
      <h1 className="text-center text-3xl mb-16 font-bold">إنشاء حساب</h1>
      <form onSubmit={handleSignUp} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="text-right block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            الإسم الكامل
          </label>
          <input
            type="text"
            id="name"
            className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="الإسم الكامل"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="text-right block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            البريد الإلكتروني
          </label>
          <input
            type="email"
            id="email"
            className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="text-right block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            رقم الهاتف
          </label>
          <input
            type="tel"
            id="phone"
            className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="رقم الهاتف: 05xxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="text-right block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            كلمة المرور
          </label>
          <input
            type="password"
            id="password"
            className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="text-right block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            إعادة كلمة المرور
          </label>
          <input
            type="password"
            id="rePassword"
            className={`text-right border text-white text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-purple-800 focus:border-purple-500 ${
              rePassword !== password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="إعادة كلمة المرور"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <InputLabel
            id="userType"
            sx={{
              color: "white",
              fontFamily: "Cairo, sans-serif",
              fontSize: "15px",
              marginBottom: "8px",
            }}
          >
            نـوع الحساب
          </InputLabel>
          <Select
            labelId="userType"
            id="userType"
            value={userType}
            label="نوع الحساب"
            onChange={(e) => setUserType(e.target.value as number)}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#364153", // لون خلفية القائمة
                },
              },
            }}
            sx={{
              width: "50%",
              textAlign: "center",
              fontFamily: "Cairo, sans-serif",
              fontSize: "15px",
              color: "white",
              direction: "rtl",
              transition: "border-color 0.3s ease",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ad46ff",
                transition: "border-color 0.3s ease",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ad46ff",
              },
              "& .MuiSvgIcon-root": { color: "white" },
            }}
          >
            <CustomMenuItem value={0}>فـنّي</CustomMenuItem>
            <CustomMenuItem value={1}>عـميل</CustomMenuItem>
          </Select>
        </div>
        {userType === 0 && (
          <div className="duration-300">
            <div className="mb-5">
              <label
                htmlFor="experienceYears"
                className="text-right block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                سنوات الخبرة
              </label>
              <input
                type="number"
                id="experienceYears"
                className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="سنوات الخبرة"
                value={experienceYears}
                onChange={(e) => setExperienceYears(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="pricePerHour"
                className="text-right block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                السعر بالساعة
              </label>
              <input
                type="number"
                id="pricePerHour"
                className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="السعر بالساعة"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(parseInt(e.target.value))}
                required
              />
            </div>
          </div>
        )}
        <button
          type="submit"
          className={`mb-2 block transition-all text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? "...إنتظر" : "تسـجـيـل"}
        </button>
        <a href="/login" className="text-right block text-blue-300 text-md">
          لديك حساب؟ تسجيل دخول
        </a>
      </form>
    </div>
  );
}

export default SignUp;
