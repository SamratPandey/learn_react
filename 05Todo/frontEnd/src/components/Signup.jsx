import * as React from "react";
import axios from "axios";
import { useState } from "react";
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
import { LogIn, Mail, Lock, ArrowRight, UserRound } from "lucide-react";
import { useNavigate } from "react-router";


 function Signup() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const handleFormData = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSignup = async () =>{
    try {
      const response = await axios.post("http://localhost:8000/signup",{
        name:formData.name,
        email: formData.email,
        password: formData.password
      })
      toast.success(`${response.data.message}, redirecting...`);
      setTimeout(() => {
        navigate("/signin")
      },1000)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-semibold">Welcome</h1>
        <p className="text-gray-500 font-semibold text-base">Sign up to save your Todo</p>
    </div>
    <Card className="w-[350px] bg-white text-gray-800 shadow-lg">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-base font-semibold">
                Your Name
              </Label>
              <div className="relative">
                <UserRound className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  className="pl-10 font-semibold placeholder:font-semibold  text-gray-500  placeholder:text-gray-500"
                  type="name"
                  name="name"
                  placeholder="enter your name"
                  value={formData.name}
                  onChange={(e) => handleFormData(e)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-base font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  className="pl-10 font-semibold placeholder:font-semibold text-gray-500 placeholder:text-gray-500"
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
                <Lock className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  className="pl-10 font-semibold placeholder:font-semibold text-gray-500 placeholder:text-gray-500"
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
          onClick={handleSignup}
          >
          <LogIn className="text-white" /> Sign up
        </Button>
        <div className="flex mt-4 items-center font-semibold text-sm text-gray-500 gap-1">
          <span>Already have account?</span>
          <Link className="text-blue-600 flex items-center gap-1" to="/signin">
            Sign in
            <ArrowRight className="text-blue-600 w-4 h-4" />
          </Link>
        </div>

      </CardFooter>
     
    </Card>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        className: "",
        duration: 5000,
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
  </div>
  );
}

export default Signup;