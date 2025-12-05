import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import logo from "@/assets/logo.jpg";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useContext(AuthContext);

  // 🔥 LOGIN FUNCTION (connects to backend)
  const onLogin = async (data) => {
    try {
      const result = await axios.post(`${API_URL}/signin`, {
        email: data.email,
        password: data.password,
      });

      // Save token + user to context (and localStorage via provider)
      login(result.data.user, result.data.token);

      alert("Logged in successfully!");
      navigate("/"); // redirect to homepage
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fff6f2]">
      <Card className="mt-6 shadow-md rounded-2xl border-none w-full max-w-md">
        <CardHeader className="text-center">
          <img src={logo} alt="Saffarni Logo" className="mx-auto w-20 mb-2" />
          <CardTitle className="text-2xl text-[#e96642] font-semibold">
            Your journey begins again 🌍
          </CardTitle>
          <CardDescription>
            Log in to continue your adventure with Saffarni!
          </CardDescription>
        </CardHeader>

        {/* FORM START */}
        <form onSubmit={handleSubmit(onLogin)}>
          <CardContent className="grid gap-5">
            {/* EMAIL */}
            <div className="grid gap-2">
              <Label htmlFor="email-login">Email</Label>
              <Input
                id="email-login"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="grid gap-2">
              <Label htmlFor="password-login">Password</Label>
              <Input
                id="password-login"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-3">
            <Button
              type="submit"
              className="w-full bg-[#e96642] hover:bg-[#ff744f] text-white font-medium"
            >
              Log In
            </Button>

            <div className="text-sm text-gray-600">
              Don’t have an account?
              <Button
                variant="link"
                className="text-[#e96642] hover:text-[#ff744f] ml-1"
                onClick={() => navigate("/signup")}
              >
                Create one
              </Button>
            </div>
          </CardFooter>
        </form>
        {/* FORM END */}
      </Card>
    </div>
  );
}

export default Login;
