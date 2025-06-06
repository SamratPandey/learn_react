import * as React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


import { Button } from "@/components/ui/button";
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
import { Link } from "react-router";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import DarkLight from "./DarkLight";
import { useState } from "react";
import { useNavigate } from "react-router";

const Signin = () =>{

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }


  const handleSignin = async () =>{
   try {
    const response = await axios.post("http://localhost:8000/login",{
      email: formData.email,
      password: formData.password,
    })
    localStorage.setItem("token", response.data.token)
    toast.success(`${response.data.message}, redirecting...`)
    setTimeout(() => {
      navigate("/todo")
    }, 1000)
   } catch (error) {
    toast.error(error.response.data.message)
   }
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-700">
        <DarkLight />
      <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400 font-semibold text-base">Sign in to access your Todo</p>
      </div>
      <Card className="w-[350px] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-400 shadow-lg">
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-base font-semibold">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    className="pl-11 font-semibold placeholder:font-semibold text-gray-500 placeholder:text-gray-500"
                    type="email"
                    name="email"
                    placeholder="youremail@example.com"
                    value={formData.email}
                    onChange={(e) => handleFormData(e)}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="font-semibold text-base">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    className="pl-11 font-semibold placeholder:font-semibold text-gray-500 placeholder:text-gray-500"
                    type="password"
                    name="password"
                    placeholder="•••••••••"
                    value={formData.password}
                    onChange={(e) => handleFormData(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center ">
          <Button 
            className="font-semibold hover:cursor-pointer bg-blue-600 w-full text-base"
            onClick={handleSignin}
            >
            <LogIn className="text-white dark:text-black" /> Sign in
          </Button>
          <div className="flex mt-4 items-center font-semibold text-sm text-gray-500 gap-1">
            <span>Don't have an account?</span>
            <Link className="text-blue-600 flex items-center gap-1" to="/signup">
              Sign up
              <ArrowRight className="text-blue-600 w-4 h-4" />
            </Link>
          </div>
        </CardFooter>
      </Card>
      <Toaster
        position="down-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1000,
        }}
      />
    </div>
  );
}


export default Signin;