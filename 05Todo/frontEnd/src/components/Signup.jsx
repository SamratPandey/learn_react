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
import { LogIn } from "lucide-react";



 function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [message, setMessage] = useState("");

  const handleFormData = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSignup = async () =>{
    const response = await axios.post("http://localhost:8000/signup",{
      name:formData.name,
      email: formData.email,
      password: formData.password
    })
    setMessage(response.data.message);
    toast.success(message);
  }

  


  return (
    <div className="flex items-center justify-center h-screen bg-[#006A71]">
      <Card className="w-[350px] bg-[#838b8b] text-black ">
        <CardHeader>
          <CardTitle className="font-bold text-2xl text-black flex justify-center">
            Signup
          </CardTitle>
          <CardDescription className="text-black font-medium flex justify-center">
            A Todo Application for your daily uses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="font-bold">
                  Name
                </Label>
                <Input
                  className="placeholder:font-medium placeholder:text-black"
                  type="text"
                  name="name"
                  placeholder="Enter Your Full Name"
                  value={formData.name}
                  onChange={(e) => handleFormData(e)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="font-bold">
                  Email
                </Label>
                <Input
                  className="placeholder:font-medium placeholder:text-black"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleFormData(e)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="font-bold">
                  Password
                </Label>
                <Input
                  className="placeholder:font-medium placeholder:text-black"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleFormData(e)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center ">
          <Button 
            onClick={handleSignup}
            className="font-medium hover:cursor-pointer px-10"
            >
            <LogIn className="text-white" /> Signup
          </Button>
          <span className="font-medium">
            Already have a Account?{" "}
            <Link className="font-bold" to="/signin">
              Signin
            </Link>
          </span>
        </CardFooter>
        <Toaster 
          position="top-right"
        />
      </Card>
    </div>
  );
}

export default Signup;