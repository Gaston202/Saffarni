import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // ▶ REGISTER USER (fixed version: no unused vars)
  const onSubmit = async (data) => {
    try {
      // create account
      await axios.post(`${API_URL}/users`, {
        userName: data.username,
        email: data.email,
        password: data.password,
        age: data.age || null,
      });

      // auto-login: call signin and populate auth context
      const signin = await axios.post(`${API_URL}/signin`, {
        email: data.email,
        password: data.password,
      });

      // call login from context (persists user+token)
      login(signin.data.user, signin.data.token);

      alert("Account created and logged in!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fff6f2]">
      <Tabs defaultValue="signup" className="w-full max-w-md">
        <TabsContent value="signup">
          <Card className="mt-6 shadow-md rounded-2xl border-none">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-[#e96642] font-semibold">
                Create Your Saffarni Account
              </CardTitle>
              <CardDescription>
                Let’s plan your next adventure 🌴
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="grid gap-5">
                {/* USERNAME */}
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your name"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* AGE (optional) */}
                <div className="grid gap-2">
                  <Label htmlFor="age">Age (optional)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    {...register("age")}
                  />
                </div>

                {/* EMAIL */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="grid gap-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirm", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  {errors.confirm && (
                    <p className="text-red-500 text-sm">
                      {errors.confirm.message}
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col items-center gap-3">
                <Button
                  type="submit"
                  className="w-full bg-[#e96642] hover:bg-[#ff744f] text-white font-medium"
                >
                  Start Exploring
                </Button>

                <div className="text-sm text-gray-600">
                  Already have an account?
                  <Button
                    variant="link"
                    className="text-[#e96642] hover:text-[#ff744f] ml-1"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SignUp;
