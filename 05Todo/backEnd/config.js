const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const response = await mongoose.connect('mongodb+srv://noName:7o6awyT7nU0WQN72@cluster1.6y9a2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {dbName:'todo-app'});
        if(response){
            console.log("Database connected")
        }
    } catch (error) {
        console.log("Error while connected to  Database")
    }
}

module.exports = {
    connectDB
}
