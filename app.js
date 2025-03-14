require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const { Server } = require("socket.io");

require("./services/cronJobs/taskRemainders");


const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => res.send("Project Management API is running"));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);


// const http = require("http");
// const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }  // Allow frontend to connect
});

// io.on("connection", (socket) => {
//     console.log("A user connected");

//     socket.on("updateTask", (task) => {
//         io.emit("taskUpdated", task);  // Broadcast to all clients
//     });

//     socket.on("disconnect", () => {
//         console.log("A user disconnected");
//     });
// });

// io.on("connection", (socket) => {
//     console.log("A user connected");

//     socket.on("newComment", (comment) => {
//         io.emit("commentAdded", comment);  // Broadcast to all clients
//     });

//     socket.on("disconnect", () => {
//         console.log("A user disconnected");
//     });
// });

// app.set("socketio", io);

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("newNotification", (notification) => {
        io.emit(`notification-${notification.userId}`, notification);  // Notify specific user
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

app.set("socketio", io);

export default app;