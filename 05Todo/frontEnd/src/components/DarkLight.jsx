import { Button } from "./ui/button";
import {Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkLight = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "dark";
      });
      
      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode ? "dark" : "light");
      }, [darkMode]);

      const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
      };
      
    return(
        <>
            <div className="absolute top-15 right-20 z-10">
                <button 
                    className="bg-transparent"
                    onClick={toggleDarkMode}
                >
                    {darkMode ?<Moon className="text-white" /> : <Sun className="text-black" />}
                </button>
            </div>
        </>
    );
}


export default DarkLight;