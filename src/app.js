// import express from "express";
// import { Server } from "socket.io";
// import os from "os";

// const app = express();
// const server = app.listen(4000, () => {
//   console.log("Server is running on port 4000");
// });

// const io = new Server(server);

// function getCpuLoad() {
//   const cpus = os.cpus();
//   const totalCpuUsage = cpus.reduce((acc, cpu) => {
//     const total = Object.values(cpu.times).reduce(
//       (total, value) => total + value,
//       0
//     );
//     const idle = cpu.times.idle;
//     return acc + (1 - idle / total) * 100;
//   }, 0);
//   return (totalCpuUsage / cpus.length).toFixed(2);
// }
// function getMemoryUsage() {
//   const totalMemory = os.totalmem();
//   const freeMemory = os.freemem();
//   const usedMemory = totalMemory - freeMemory;

//   return {
//     used: (usedMemory / 1024 ** 3).toFixed(2),
//     total: (totalMemory / 1024 ** 3).toFixed(2),
//   };
// }

// function getDiskUsage() {
//   const totalDisk = 100;
//   const usedDisk = 50;

//   return {
//     used: usedDisk,
//     total: totalDisk,
//   };
// }

// setInterval(() => {
//   const cpuLoad = getCpuLoad();
//   const memoryUsage = getMemoryUsage();
//   const diskUsage = getDiskUsage();

//   io.emit("serverData", {
//     cpuLoad,
//     memoryUsage,
//     diskUsage,
//   });
// }, 5000);
// io.on("connection", (socket) => {
//   console.log("Client connected");

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// ////////////// 2-vazifa

// const server = app.listen(4001, () => {
//   console.log("Server is running on port 4001");
// });

// const io = new Server(server);

// io.on("connection", (socket) => {
//   let userName = socket.handshake.headers.username;
//   let currentTime = new Date();
//   let hours = currentTime.getHours().toString().padStart(2, "0");
//   let minutes = currentTime.getMinutes().toString().padStart(2, "0");
//   let formattedTime = `${hours}:${minutes}`;

//   io.emit("online", `${userName} tarmoqda: Vaqt(${formattedTime})`);

//   socket.on("message", (message) => {
//     let currentTime = new Date();
//     let hours = currentTime.getHours().toString().padStart(2, "0");
//     let minutes = currentTime.getMinutes().toString().padStart(2, "0");
//     let formattedTime = `${hours}:${minutes}`;

//     io.emit(
//       "messages",
//       `${userName} dan yangi xabar: ${message}, Vaqt: ${formattedTime}`
//     );
//   });

//   socket.on("disconnect", () => {
//     let currentTime = new Date();
//     let hours = currentTime.getHours().toString().padStart(2, "0");
//     let minutes = currentTime.getMinutes().toString().padStart(2, "0");
//     let formattedTime = `${hours}:${minutes}`;
//     io.emit("offline", `${userName} tarmoqdan chiqdi: Vaqt(${formattedTime})`);
//   });
// });
