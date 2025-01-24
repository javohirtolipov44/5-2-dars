import express from "express";
import { Server } from "socket.io";

const app = express();

const server = app.listen(4000, () => {
  console.log("server is running 4000");
});

const io = new Server(server);

function getTime() {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tashkent",
  };
  return new Date().toLocaleString("uz-UZ", options);
}

io.on("connection", (socket) => {
  const username = socket.handshake.headers.username;
  socket.broadcast.emit("online", `${username} chatga kirdi    (${getTime()})`);

  socket.on("message", (message) => {
    io.emit(
      "messages",
      `${username}:     ${message.message}    (${getTime()})`
    );
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "offline",
      `${username} chatdan chiqdi    (${getTime()})`
    );
    console.log(username);
  });
});
