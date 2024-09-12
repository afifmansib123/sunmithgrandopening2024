process.noDeprecation = true;

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const logger = require("morgan");
const cors = require("cors");

const port = process.env.PORT || 5000;
//routes

const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const TableRoutes = require('./routes/tables.js')
const TokenRoutes = require('./routes/tokens.js');
const qrcoderoute = require('./routes/qrcodeguests.js')


dotenv.config();

const connect = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb+srv://sunmiTH:Nopassword0@cluster0.fli7r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  } catch (error) {
    throw error;
  }
};


app.get('/', (req,res)=>{
  res.send('hello world')
})

//middlewares
app.use(logger("dev"));
app.use(cors({ // CORS middleware configuration
  origin: '*', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/tables", TableRoutes);
app.use("/tokens", TokenRoutes);
app.use('/qrcodeforguests', qrcoderoute)

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

module.exports = (req, res) => {
  connect().then(() => {
    return app(req, res);
  }).catch(err => {
    res.status(500).send("Error connecting to database");
  });
};