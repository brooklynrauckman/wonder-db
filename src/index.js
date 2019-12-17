const db = require("./queries");
const express = require("express");
var cors = require("cors");
// const { Client } = require('pg')
const bodyParser = require("body-parser");
//create express app
const app = express();

//port at which the server will run
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
   
// create routes
app.get("/:type", async (request, response) => {
  const data = await db.getListByType(request, response);
  return response.json(data);
});

app.post("/users", async (request, response) => {
  try{
    const data = await db.insertName(request, response);
    return response.json(data);
  } catch(err){
    return response.json({error: 'problem posting to D'})
  }
});

app.get("/", async (request, response) => {
  const data = await db.getNames(request, response);
  return response.json(data);
});

//start server and listen for the request
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);
