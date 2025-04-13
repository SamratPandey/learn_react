import * as React from "react";
import axios from "axios";

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

import { useState } from "react";

function Signin() {


  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }


  const handleSignin = async () =>{
    const response = await axios.post("http://localhost:8000/login",{
      email: formData.email,
      password: formData.password,
    })
    console.log(response.data)
  }


  return (
    <div className="flex items-center justify-center h-screen bg-[#006A71]">
      <Card className="w-[350px] bg-[#838b8b] text-black ">
        <CardHeader>
          <CardTitle className="font-bold text-2xl text-black flex justify-center">
            Signin
          </CardTitle>
          <CardDescription className="text-black font-medium flex justify-center">
            A Todo Application for your daily uses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
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
            className="font-medium hover:cursor-pointer px-10"
            onClick={handleSignin}
            >
            <LogIn className="text-white" /> Signin
          </Button>
          <span className="font-medium">
          Don't have a account?{" "}
            <Link className="font-bold" to="/signup">
              Signup
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}


export default Signin;