import React from "react";
import SignUp from "./SignUp";

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
import logo from "@/assets/logo.jpg";

function Login() {
  const navigate = useNavigate();

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

        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="email-login">Email</Label>
            <Input id="email-login" type="email" placeholder="Enter your email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-login">Password</Label>
            <Input id="password-login" type="password" placeholder="Enter your password" />
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
      </Card>
    </div>
  );
}


export default Login;
