
const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URL, {dbName:'todo-app'});
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
