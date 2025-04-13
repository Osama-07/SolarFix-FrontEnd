"use client";
import axiosInstance from "../lib/axios";
import React, { FormEvent } from "react";
import { useUser } from "../Context/UserContext";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { dispatch } = useUser();

  async function handleLogin(event: FormEvent): Promise<void> {
    event.preventDefault();
    setLoading(true);

    try {
      const response: AxiosResponse = await axiosInstance.post("/Login", {
        Email: email,
        Password: password,
      });
      const token: string = response.headers["authorization"]?.replace(
        "Bearer ",
        ""
      );
      if (token) {
        sessionStorage.setItem("token", token);
      }
      dispatch({ type: "LOGIN", payload: response.data });
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-purple-800 via-purple-900 to-black">
      <h1 className="text-center text-3xl mt-44 mb-14 font-bold">
        تسجيل الدخول
      </h1>
      <form onSubmit={handleLogin} className="max-w-sm mx-auto">
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
        <button
          type="submit"
          className={`block mb-2 transition-all text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
            loading ? "cursor-not-allowed" : ""
          }`}
        >
          {loading ? "...إنتظر" : "تسجيل الدخول"}
        </button>
        <a href="/signup" className="text-right block text-blue-300 text-md">
          ليس لديك حساب؟
        </a>
      </form>
    </div>
  );
}

export default Login;
