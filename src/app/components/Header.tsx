import React from "react";
import { useUser } from "../Context/UserContext";

function Header() {
  const { state } = useUser();
  return (
    <header className="max-md:flex-col-reverse flex justify-between bg-purple-800 max-lg:px-10 lg:px-28 py-5">
      <h1 className="max-md:text-center max-sm:text-2xl text-3xl font-bold text-white">
        مرحباً يا {state.user?.fullName}
      </h1>
      <h1 className="max-md:text-center max-md:mb-3 text-3xl font-bold text-white">
        SolarFix
      </h1>
    </header>
  );
}

export default Header;
