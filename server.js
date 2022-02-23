import express from "express";
import { engine } from "express-handlebars";
const app = express();
import mongoose from "mongoose";
import path from "path";
import ContactModel from "./Contact";
import nodemailer from "nodemailer";

//------------------database Connection Starts here-----------------------
let mongodbURL = "mongodb://localhost:27017/students";
mongoose.connect(mongodbURL, err => {
  if (err) throw err;
  console.log("DataBase connected");
});
//------------------database Connection Ends here-----------------------

// ---------middileware block-------------------
app.use(express.static(path.join(__dirname, "public")));

//body [parser]
app.use(express.urlencoded({ extended: true }));
// ---------middleware block ends------------

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
//?
app.set("views", "./views");
// basic routing
app.get("/", (req, res) => {
  res.render("home", {
    title: "Welcome to Jspiders",
    description: "Hello Students How are you",
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "contact us",
  });
});
app.get("/Assignment", (req, res) => {
  res.render("Assignment", {
    title:"Assignments"
  })
})

// -------------All post request starts here
app.post("/contact", async (req, res) => {
// save incoming request into mongodb database
  let payload = await req.body;
//nodemailer block
  nodemailer
    .createTransport({
      service: "gmail",
      auth: {
        user: "rkkarthi43@gmail.com",
        pass: "Karthi143",
      },
    })
    .sendMail({
      from: "rkkarthi43@gmail.com",
      to: [req.body.email, "priyanka.km@testyantra.com"],
      subject: "contact form",
      html: `<h1>${req.body.firstname}</h1>
          <h1>${req.body.lastname}</h1>
          <p>${req.body.email}</p>
           <p>${req.body.phone}</p>
            <p>${req.body.description}</p>
          `,
    });
  let data = await ContactModel.create(payload);
  console.log(data);
  res.send( { data, text: "Successfully created" });
  
});
// listen app

app.listen(5000, err => {
  if (err) throw err;
  console.log("server is running on port 5000");
});
