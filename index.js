const express = require('express');
const cors = require("cors")
const app = express()
const bodyParser = require('body-parser')


const mongoose = require('mongoose');
const { text } = require('body-parser');
mongoose.connect("mongodb+srv://fayizkiliyamannil:JuT7glAHQK21StJT@cluster0.4fhdznl.mongodb.net/")
  .then(() => console.log("mongodb is connected..!"))
  .catch((error) => console.error(error));

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
  })
)

app.use(express.json()); // Parse JSON bodies, if any
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





const Route = require("./routers/router")
app.use("/api",Route)



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
