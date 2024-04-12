require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const whitelist = ["http://127.0.0.1:5500"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// app.use(cors());

const limiter = rateLimit({
  windowMs:1000,
  max:1
});

app.use(limiter);

app.get("/", (req,res)=>{
  res.send("This is from app.js");
})

app.post("/api/weather",async (req,res)=>{
  try{
    let cityname = req.body.cityname;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    let response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).send(data);
  }catch(error){
    console.log("Error", error);
    res.status(500).send("An errored while fetching weather data");
  }

});

app.use((req, res,) => {
  res.status(404).send("404 - Not Found");
});

app.listen(PORT, ()=>{
  console.log(`App listening on http://localhost:${PORT}`);
})


