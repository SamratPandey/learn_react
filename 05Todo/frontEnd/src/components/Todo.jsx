import { useState, useEffect, useRef, use } from "react";
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
  const handleDeleteTodo = async (id) => {};

  const handleEditTodo = async (id) => {};

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
    <div className="bg-gray-100 flex flex-col justify-center items-center dark:bg-gray-900 h-screen w-screen">
      <DarkLight />
      {showTask ? (
        <Task
            todo={todo}
            setTodo={setTodo}
            handleAddTodo={handleAddTodo}
            taskRef={taskRef}
        />
        ) : null}

      <div className="absolute top-35 right-40 z-10">
        <button
          onClick={() => handleTask()}
          className="hover:cursor-pointer px-7 py-3 bg-white dark:bg-gray-700 shadow-2xl rounded-2xl font-bold text-gray-500 dark:text-gray-400"
        >
          Add Task +
        </button>
      </div>
      {todos.length > 0 ? (
        todos.map((todo) => {
          return (
            <Card
              key={todo._id}
              className="flex flex-row p-2 bg-gray-900 items-center gap-2 mb-2"
            >
              <h1
                className={`${
                  todo.done ? "line-through" : "no-underline"
                } text-3xl text-black dark:text-white font-semibold`}
              >
                {todo.tittle}
              </h1>
              <button className="bg-transparent">
                <Pencil
                  onClick={() => handleEditTodo(todo._id)}
                  className="text-gray-500 dark:text-gray-400 hover:cursor-pointer"
                />
              </button>
              <button>
                <Trash2
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="text-red-500 dark:text-red-400 hover:cursor-pointer"
                />
              </button>
            </Card>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl text-black dark:text-white font-semibold">
            No Todos
          </h1>
          <p className="text-gray-500 dark:text-gray-400  font-semibold text-base">
            You have no todos yet
          </p>
        </div>
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default Todo;
