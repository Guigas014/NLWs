import "reflect-metadata";
import express from 'express';

import "./database";


const app = express();

app.get("/test", (req, res) => {
  return res.send("Hi!!")
})

app.post("/test-post", (req, res) => {
  return res.send("Hi POST")
})


app.listen(3000, () => console.log("Server is running"))

