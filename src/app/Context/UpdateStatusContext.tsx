"use client";
import React, { useState } from "react";

export interface UpdateStatusContextType {
  orderStatus: string;
  setOrderStatus: React.Dispatch<React.SetStateAction<string>>;
}

const UpdateStatusContext = React.createContext<
  UpdateStatusContextType | undefined
>(undefined);

function UpdateStatusProvider({ children }: { children: React.ReactNode }) {
  const [orderStatus, setOrderStatus] = useState<string>("");

  const values: UpdateStatusContextType = { orderStatus, setOrderStatus };

  return (
    <UpdateStatusContext.Provider value={values}>
      {children}
      {/* */}
    </UpdateStatusContext.Provider>
  );
}

export function useUpdateStatus() {
  const context = React.useContext(UpdateStatusContext);
  if (!context) {
    throw new Error(
      "UpdateStatusContext must be used within a UpdateStatusProvider"
    );
  }
  return context;
}

export default UpdateStatusProvider;
