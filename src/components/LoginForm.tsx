// LoginForm.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../helpers/constants";
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver


type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    login: { loading, loggedIn },
    handleLogin,
    loggedInState,
  } = useAuth();
  const [viewPassword, setViewPassword] = useState<boolean>(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }, // Access form validation errors
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;
    handleLogin(email, password);
  };

  useEffect(() => {
    if (loggedInState) {
      navigate("/profile");
    }
  }, [loggedInState, navigate]);

  useEffect(() => {
    if (loggedIn) {
      navigate("/profile");
      toast.success("Successfully logged in");
    }
  }, [loggedIn, navigate]);

  return (
    <div className=" flex-1 max-w-2xl  px-14 py-10 bg-white rounded-xl shadow-[0px_4px_25px_rgba(102,102,102,0.2)] m-3">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="lg:mb-12 md:mb-8 mb-6">
        <h2 className="text-[#1A1A1A] font-semibold lg:text-2xl md:text-lg text-sm ">
          Login to your dashboard
        </h2>
        <p className="lg:text-base md:text-sm text-xs text-[#858585]">
          Provide details to login to your account
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} id="form">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              className={`p-5 b-white border border-solid border-[#1A1A1A] rounded-lg border-spacing-3 outline-none focus:ring-4 focus:ring-gray-200 lg:mb-6 md:mb-4 mb-3 ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email")} // Register the input with React Hook Form
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 relative lg:mb-12 md:mb-7 mb-5">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={viewPassword ? "password" : "text"}
              placeholder=""
              className={`p-5 b-white border border-solid border-[#1A1A1A] rounded-lg border-spacing-3 outline-none focus:ring-4 focus:ring-gray-200 ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password")} // Register the input with React Hook Form
            />
            <IconContext.Provider value={{ style: { color: "#A6A6A6" } }}>
              <div className="absolute right-4 bottom-5">
                <div
                  className={`${viewPassword ? "" : "hidden"}`}
                  onClick={() => setViewPassword(false)}
                >
                  <AiOutlineEye size={21} />
                </div>
                <div
                  className={`${viewPassword ? "hidden" : ""}`}
                  onClick={() => setViewPassword(true)}
                >
                  <AiOutlineEyeInvisible size={21} />
                </div>
              </div>
            </IconContext.Provider>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className={`${
              loading ? "bg-[#cdffe8] cursor-not-allowed" : "bg-[#1CC578]"
            } w-full p-5 rounded-[40px] text-white lg:text-base md:text-sm text-xs active:scale-90 `}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
