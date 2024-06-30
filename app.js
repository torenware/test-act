import path from 'path';
import OS from 'os';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv  from "dotenv";


dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors())

try {
  await mongoose.connect(process.env.MONGO_URI, {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
  });
  console.log('Mongodb is connected');
} catch (err) {
  console.log("error!! " + err)
}

var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});
var planetModel = mongoose.model('planets', dataSchema);



app.post('/planet',   async function(req, res) {
   // console.log("Received Planet ID " + req.body.id)
   try {
     const planetData = await planetModel.findOne({
        id: req.body.id
    });
    res.send(planetData);
  } catch (err) {
    alert("Ooops, We only have 9 planets and a sun. Select a number from 0 - 9")
    res.send("Error in Planet Data")
  }
});

app.get('/',   async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});


app.get('/os',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
})

app.get('/live',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
})

app.get('/ready',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "ready"
    });
})

app.listen(3000, () => {
    console.log("Server successfully running on port - " +3000);
})


export default app;