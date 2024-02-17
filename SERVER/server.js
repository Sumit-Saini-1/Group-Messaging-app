require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
// app.use(cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//     credentials: true
// }));
const session = require("express-session");
const sessionMiddleware = session({
    secret: "anything",
    resave: false,
    saveUninitialized: true
});
app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const http = require('http');
const socketServer = http.createServer(app);
const { Server } = require("socket.io");
const chatServer = new Server(socketServer, {
    // cors: {
    //     origin: ["http://localhost:5173"],
    //     methods: ["GET", "POST"],
    //     credentials: true
    // }
});
const db = require("./Models/db");
const userRoute = require("./Routes/userRoute");
const groupRoute = require("./Routes/groupRoute");
const memberRoute = require("./Routes/membersRoute");
const messageRoute = require("./Routes/messageRoute");
const invitationRoute = require("./Routes/invitationRoute");

app.use("/",userRoute);
app.use("/group",groupRoute);
app.use("/member",memberRoute);
app.use("/message",messageRoute);
app.use("/invitation",invitationRoute);

app.use(express.static("dist/"))

app.get("/logout", function (req, res) {
    req.session.destroy();
    res.status(200).send("logout");
});

require("./Routes/socket")(chatServer);

db.init().then(function () {
    console.log("db connected");

    socketServer.listen(2000, function () {
        console.log('listening on 2000');
    });
}).catch(function (err) {
    console.log(err);
});

