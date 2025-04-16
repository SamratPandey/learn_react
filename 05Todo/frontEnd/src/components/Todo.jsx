import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Pencil } from "lucide-react";
import DarkLight from "./DarkLight";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Task = ({ todo, setTodo, handleAddTodo, taskRef }) => {
    const handleInputValue = (e) => {
      const { name, value } = e.target;
      setTodo((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <div className="absolute inset-0 backdrop-blur-sm h-screen bg-white/30 w-screen flex justify-center items-center z-10">
        <Card
          ref={taskRef}
          className="w-[450px] h-[200px] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-400 shadow-lg"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <CardContent>
              <h1 className="text-2xl text-black dark:text-white font-bold">
                Add Task
              </h1>
              <input
                type="text"
                name="tittle"
                placeholder="Enter Your Task"
                value={todo.tittle}
                className="border-2 border-gray-500 dark:border-gray-400 rounded-lg px-4 py-2 mt-4 w-full"
                onChange={handleInputValue}
              />
              <Button
                onClick={handleAddTodo}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Task
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  };
  



const Todo = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [showTask, setShowTask] = useState(false);
  const taskRef = useRef(null);
  const [todo, setTodo] = useState({ tittle: "" });

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/todo",
        {
          tittle: todo.tittle,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(response.data.message);
      setTodo({ tittle: "" });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleDeleteTodo = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:8000/todo/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          }
        })
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
  };

  const handleEditTodo = async (id) => {

  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (taskRef.current && !taskRef.current.contains(event.target)) {
        setShowTask(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getTodos = async () => {
      const reponse = await axios.get("http://localhost:8000/todos", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setTodos(await reponse.data.todos);
    };
    getTodos();
  }, [handleAddTodo, handleDeleteTodo, handleEditTodo]);


  const handleTask = () => {
    if (showTask) {
      setShowTask(false);
    } else {
      setShowTask(true);
    }
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-700  flex flex-col justify-center items-center h-screen w-screen">
      <DarkLight />
      {showTask ? (
        <Task
            todo={todo}
            setTodo={setTodo}
            handleAddTodo={handleAddTodo}
            taskRef={taskRef}
        />
        ) : null}
       
        <div className=" flex flex-row top-35 right-40 z-10">
            <button
              onClick={() => handleTask()}
              className=" absolute top-25 right-35  hover:cursor-pointer px-4 py-2 bg-gray-300 dark:bg-gray-900/50 shadow-2xl rounded-2xl font-bold text-gray-500 dark:text-gray-400"
            >
              Add Task +
            </button>
            <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/")
                }}
                className="absolute top-25 right-5 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-gray-100 font-bold py-2 px-4 rounded-2xl shadow-2xl"
            >
                Logout
            </button>
        </div>

        <div className="w-full max-w-md rounded-lg shadow-md bg-white dark:bg-gray-900 p-4 overflow-y-auto max-h-96">
            {todos.length > 0 ? (
              <div className="space-y-3">
                {todos.map((todo) => (
                  <div
                    key={todo._id}
                    className="flex items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                  >
                    <p
                      className={`${
                        todo.done ? "line-through text-gray-500" : "text-black dark:text-white"
                      } font-medium flex-grow`}
                    >
                      {todo.tittle}
                    </p>
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer  transition-colors"
                        onClick={() => handleEditTodo(todo._id)}
                      >
                        <Pencil size={18} className="text-gray-500 dark:text-gray-400" />
                      </button>
                      <button 
                        className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 hover:cursor-pointer  transition-colors"
                        onClick={() => handleDeleteTodo(todo._id)}
                      >
                        <Trash2 size={18} className="text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  No Todos
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Add a task to get started
                </p>
              </div>
            )}
          </div>
          

      <Toaster
        position="down-center"
        toastOptions={{
          duration: 1000,
        }}
      />
    </div>
  );
};

export default Todo;
