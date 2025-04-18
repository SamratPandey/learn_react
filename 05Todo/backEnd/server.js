require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { connectDB } = require("./config");
const { UserModel, TodoModel } = require("./models");
const { JWT_SECRET, auth } = require("./auth");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
connectDB();
app.use(cors());

app.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ message: "Email is not valid" });
  }

  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const newUser = await UserModel.create({
      email,
      name,
      password,
    });

    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Email is not valid" });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(403).json({ message: "Invalid password" });
    } else {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return res
        .status(200)
        .json({ message: "Login successfully", token: token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/todo", auth, async (req, res) => {
  const { tittle, done } = req.body;
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!tittle) {
    return res.status(400).json({ message: "Please fill the todo fields" });
  }
  try {
    const newTodo = await TodoModel.create({
      tittle,
      done: done || false,
      userId,
    });
    await newTodo.save();
    return res.status(201).json({ message: "Todo created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const todos = await TodoModel.find({ userId });

    if (!todos) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json({
      message: "Sucessfull",
      todos: todos,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/todo",auth,  async (req, res)=>{
  const userId = req.userId;
  if(!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id, tittle, done } =req.body;
  if(!id || !tittle || done === undefined) {
    return res.status(400).json({ message: "Please fill the todo fields" });
  }

  try {
    const todo = await TodoModel.findByIdAndUpdate(id, {
      tittle,
      done,
    });
    if(!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Not able to Update" });
  }

})

app.delete("/todo/:id", auth, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Please fill the todo fields" });
  }
  try {
    const todo = await TodoModel.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Not able to delete" });
  }
})

app.listen("8000", () => {
  console.log("App listen on port 8000");
});
