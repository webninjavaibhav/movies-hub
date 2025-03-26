import { request } from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { setToken } from "@/app/utils/auth";
import { useForm, UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Simple encryption function
const encrypt = (text: string) => {
  return btoa(text); // Base64 encoding for demonstration
};

interface LoginResponse {
  token: string;
  error: string;
}

interface LoginError {
  message: string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your email address")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address"
    ),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 special character, and 1 number"
    )
}).required();

type FormData = {
  email: string;
  password: string;
};

interface UseSignInReturn {
  handleLogin: (email: string, password: string) => Promise<void>;
  error: string;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  isLoading: boolean;
  register: UseFormRegister<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  errors: FieldErrors<FormData>;
}

export const useSignIn = (): UseSignInReturn => {
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  useEffect(() => {
    const savedEmail = Cookies.get("rememberMeEmail");
    const savedPassword = Cookies.get("rememberMePassword");
    if (savedEmail && savedPassword) {
      setRememberMe(true);
    }
  }, []);

  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const handleSuccessfulLogin = (token: string, email: string, password: string) => {
    setToken(token);

    if (rememberMe) {
      Cookies.set("rememberMeEmail", email, { expires: 30 });
      Cookies.set("rememberMePassword", encrypt(password), { expires: 30 });
    } else {
      Cookies.remove("rememberMeEmail");
      Cookies.remove("rememberMePassword");
    }

    router.push("/movie-list");
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await request<LoginResponse>({
        method: "POST",
        url: "/auth/login",
        data: JSON.stringify({ email, password }),
      });

      if (response.token) {
        handleSuccessfulLogin(response.token, email, password);
      }
    } catch (error) {
      const loginError = error as LoginError;
      setError(loginError.message);
      clearError();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    error,
    rememberMe,
    setRememberMe,
    isLoading,
    register,
    handleSubmit,
    errors
  };
};
