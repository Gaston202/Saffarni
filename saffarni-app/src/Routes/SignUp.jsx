import React from "react";
import Login from "./Login";
import { useForm } from "react-hook-form";
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

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert(`Welcome to Saffarni, ${data.username}!`);
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
              {/* ✅ JSX comment syntax (no // allowed inside JSX) */}
              <CardDescription>Let’s plan your next adventure 🌴</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="grid gap-5">
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

                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="picture"> Profile Picture</Label>
                  <Input id="picture" type="file"  />
                </div>

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
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirm", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.confirm && (
                    <p className="text-red-500 text-sm">
                      {errors.confirm.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <br />
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
