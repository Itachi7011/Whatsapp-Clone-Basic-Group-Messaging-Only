const http = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const server = http.createServer(app);
const dotenv = require("dotenv");
const Pusher = require("pusher");
const Messages = require("./database/messagesSchema");
dotenv.config();

require("./database/connection");
const db = mongoose.connection;

const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;

db.once("open", () => {
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    // console.log("A Change Occured -> ", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.user,
        message: messageDetails.message,
        timeStamp: messageDetails.timeStamp,
        recieved: messageDetails.recieved,
      });
    } else {
      console.log("Error Triggering Pusher!");
    }
  });
});

const pusher = new Pusher({
  appId: "1758288",
  key: "03ecad9c27841e971b65",
  secret: "f669b278615005b8bd04",
  cluster: "ap2",
  useTLS: true,
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/messages/sync", (req, res) => {
  const dbMessage = req.body;


  //It is Working Fine
  // res.status(201).send(dbMessage);

  Messages.find(dbMessage)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
