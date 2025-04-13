export interface User {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  userType: "Technician" | "Customer"; // نوع المستخدم بدلاً من 0 و 1
  createdAt: Date;
}

export interface UserRequestDTO {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  userType: boolean; // 0 = Technician, 1 = Customer.
  createdAt: Date;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

export type UserAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}
