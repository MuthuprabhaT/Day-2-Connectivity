const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const studentController = require("./controllers/studentController");

const app = express();

require('dotenv').config();

const dbUrl = process.env.DB_URL;

mongoose.connect (
    dbUrl,
    //Mongodb connection
    //"mongodb://0.0.0.0:27017/student_db",
    //MONGODB ATLAS
   // "mongodb+srv://guvi:guvi@prabha.jfsmco9.mongodb.net/student_db",
    {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/",studentController.getStudents);
app.post("/students",studentController.createStudent);
app.delete("/students/:id",studentController.deleteStudent);
app.get("/students/:id/edit", studentController.getEditForm);
app.put("/students/:id", studentController.updateStudent);

//const PORT = 3000;
// dotenv file
const PORT = process.env.PORT;
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));

// |
// |
// include .env file in gitignore