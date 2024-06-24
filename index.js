const express = require('express');
const cors = require("cors")
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()


const mongoose = require('mongoose');
const { text } = require('body-parser');
mongoose.connect(process.env.MONGOD)
  .then(() => console.log("mongodb is connected..!"))
  .catch((error) => console.error(error));

app.use(
  cors({
    origin: 'https://sentiment-project1.vercel.app',
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
