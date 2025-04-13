"use client";

import React, { useEffect } from "react";
import { User, UserAction, UserContextType, UserState } from "../types/user";

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
);

const initialState: UserState = {
  user: null,
  isAuthenticated: true,
};

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(userReducer, initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser: string | null = window.localStorage.getItem("user");
      if (storedUser) {
        const user: User = JSON.parse(storedUser);

        const currentId: number | undefined = state.user?.userId;
        const newId: number = user.userId;

        if (!currentId || currentId !== newId) {
          dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } else {
        dispatch({ type: "LOGOUT" });
      }
    }
  }, []);

  const userValues: UserContextType = { state, dispatch };

  return (
    <UserContext.Provider value={userValues}>
      {children}
      {/*  */}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  return context;
}

export default UserProvider;
