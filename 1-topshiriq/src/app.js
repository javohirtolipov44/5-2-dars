import express from "express";
import { Server } from "socket.io";
import os from "os";

const app = express();
const server = app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

const io = new Server(server);

function getCpuLoad() {
  const cpus = os.cpus();

  for (let i = 0; i < cpus.length; i++) {
    console.log("CPU %s:", i);
    const cpu = cpus[i];
    let total = 0;

    for (let type in cpu.times) {
      total += cpu.times[type];
    }

    for (let type in cpu.times) {
      console.log("\t", type, Math.round((100 * cpu.times[type]) / total));
    }
  }
}
function getMemoryUsage() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  return {
    used: (usedMemory / 1024 ** 3).toFixed(2),
    total: (totalMemory / 1024 ** 3).toFixed(2),
  };
}

function getDiskUsage() {
  return "qanday kod yozishni bilmadim";
}

setInterval(() => {
  const cpuLoad = getCpuLoad();
  const memoryUsage = getMemoryUsage();
  const diskUsage = getDiskUsage();

  io.emit("serverData", {
    cpuLoad,
    memoryUsage,
    diskUsage,
  });
}, 5000);
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
