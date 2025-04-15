import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import DarkLight from "./DarkLight";

const Home =() =>{


    const navigate = useNavigate()

    return(
        <div className="flex flex-row gap-6  items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <DarkLight />
            <Button 
                onClick={() => navigate('/signin')}
                className='hover:cursor-pointer font-bold hover:bg-gray-600 hover:text-black px-8 py-5'
                >
                Signin
            </Button>
            <Button 
             onClick={() => navigate('/signup')}
                className='hover:cursor-pointer font-bold hover:bg-gray-600 hover:text-black px-8 py-5'
                >
                Signup
            </Button>
        </div>
    )
}

export default Home;