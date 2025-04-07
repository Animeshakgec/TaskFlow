// Ensure this is in package.json:
// { "type": "module" }

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";

//import "./services/cronJobs/taskRemainders.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => res.send("Project Management API is running"));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const server = http.createServer(app);

// Uncomment and configure Socket.IO as needed:
// const io = new Server(server, {
//     cors: { origin: "*" }
// });

// io.on("connection", (socket) => {
//     console.log("A user connected");

//     socket.on("updateTask", (task) => {
//         io.emit("taskUpdated", task);
//     });

//     socket.on("newComment", (comment) => {
//         io.emit("commentAdded", comment);
//     });

//     socket.on("newNotification", (notification) => {
//         io.emit(`notification-${notification.userId}`, notification);
//     });

//     socket.on("disconnect", () => {
//         console.log("A user disconnected");
//     });
// });

// app.set("socketio", io);

export default app;
