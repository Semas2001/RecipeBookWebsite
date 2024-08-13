// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./models/User');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: Login } = require('./pages/login');
const { default: Signup } = require('./pages/signup');
const uri = "mongodb+srv://semasarmonaitis:Semas2001@cluster0.34dggy4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const PORT = process.env.PORT || 3000;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
// Middleware
app.use(bodyParser.json());

app.get("/login",(req,res)=>{
  res.render(Login)
})

app.get("/signup",(req,res)=>{
  res.render(Signup)
})



//mongodb+srv://semasarmonaitis:<password>@cluster0.34dggy4.mongodb.net/