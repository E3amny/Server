const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const socket = require('socket.io')
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
const path = require('path');
app.use(express.static(path.resolve(__dirname, './client/build')));

// import Routers
const signupRouter = require("./routers/routes/auth/signup")
const fundraiserRouter = require("./routers/routes/fundraiser")
const loginRouter = require("./routers/routes/auth/login")
const adminRouter = require("./routers/routes/AdminFuction")
const bloodpostRouter = require("./routers/routes/bloodPost")
const searchRouter = require('./routers/routes/Services/search')
const contributionRouter = require('./routers/routes/Contribution')
const stripeRouter = require('./routers/routes/Services/stripe')
const helpSpecificRouter = require('./routers/routes/helpSpecific')
const { join_User, get_Current_User, user_Disconnect, c_users } = require('./routers/controllers/Services/chat');
const forgetPasswordRouter = require('./routers/routes/Services/forgotPassword')
// const { isTypedArray } = require("util/types");

// const {postInformationSender} = requrire bla bla //
//app Routers
app.use("/signup", signupRouter);
app.use("/fundraiser", fundraiserRouter)
app.use("/login", loginRouter)
app.use('/admin', adminRouter);
app.use('/bloodpost', bloodpostRouter);
app.use('/search', searchRouter);
app.use("/Contribution", contributionRouter);
app.use('/payment', stripeRouter)
app.use('/helpSpecific', helpSpecificRouter)
app.use('/forgetPassword', forgetPasswordRouter)

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const server = app.listen(PORT, () => {
    console.log(`Server On ${PORT}`);
});


const io = socket(server, { cors: { origin: "*" } })


app.set('socketio', io);   // exporting socket io to all files - global ussage in all app files

io.on("connection", (socket) => {
    //for a new user joining the room
    socket.on("joinRoom", ({ username, roomname }) => {
        //* create user
        const p_user = join_User(socket.id, username, roomname);
        console.log(socket.id, "=id");
        socket.join(p_user.room);

        //display a welcome message to the user who have joined a room
        socket.emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `Welcome ${p_user.username}`,
        });

        //displays a joined room message to all other room users except that particular user
        socket.broadcast.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has joined the chat`,
        });
        io.emit("admin",{allusers:c_users})
    });

    //user sending message
    socket.on("chat", (text) => {
        //gets the room user and the message sent
        const p_user = get_Current_User(socket.id);

        io.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: text,
        });
    });

    //when the user exits the room
    socket.on("disconnectOne", (room) => {
        //the user is deleted from array of users and a left room message displayed
        const p_user = user_Disconnect(socket.id);
        socket.leave(p_user.room)
        if (p_user) {
            io.to(p_user.room).emit("message", {
                userId: p_user.id,
                username: p_user.username,
                text: `${p_user.username} has left the room`,
            });
        }
    });

}); //end socket
module.exports = {io}