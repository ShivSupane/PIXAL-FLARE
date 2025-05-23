import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  AuthState,
  LoginCredentials,
  SignupCredentials,
  User,
} from "@/types/auth";

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SIGNUP_START" }
  | { type: "SIGNUP_SUCCESS"; payload: User }
  | { type: "SIGNUP_FAILURE"; payload: string };

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
    case "SIGNUP_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "SIGNUP_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored auth token and validate it
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        try {
          // In a real app, validate token with backend
          // For now, just use the stored user data
          const user = JSON.parse(userData);
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
        } catch (error) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: "LOGIN_START" });
    try {
      // Implement actual login API call here
      // For demo purposes, check if it's an admin login
      const isAdmin = credentials.email.includes("admin");

      const mockUser: User = {
        id: "1",
        email: credentials.email,
        firstName: isAdmin ? "Admin" : "John",
        lastName: isAdmin ? "User" : "Doe",
        role: isAdmin ? "admin" : "user",
        createdAt: new Date().toISOString(),
        phone: "+91 98765 43210",
      };
      localStorage.setItem("authToken", "mock-token");
      localStorage.setItem("userData", JSON.stringify(mockUser));
      dispatch({ type: "LOGIN_SUCCESS", payload: mockUser });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Invalid credentials" });
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    dispatch({ type: "SIGNUP_START" });
    try {
      // Implement actual signup API call here
      const mockUser: User = {
        id: "1",
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("authToken", "mock-token");
      localStorage.setItem("userData", JSON.stringify(mockUser));
      dispatch({ type: "SIGNUP_SUCCESS", payload: mockUser });
    } catch (error) {
      dispatch({ type: "SIGNUP_FAILURE", payload: "Registration failed" });
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
