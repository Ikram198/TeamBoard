import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import app from "./app.js";
import connectDB from "./db/index.js";

const PORT = Number(process.env.PORT) || 3000;

let server;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected");

    server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      console.error("❌ Server failed to start:", err.message);
      process.exit(1);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();

// ---- Process-level safety nets ----

// Catch errors thrown outside of any try/catch (e.g. async code without .catch)
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
  // Let ongoing requests finish, then exit — a process manager (pm2/systemd/docker) should restart it
  shutdown(1);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  shutdown(1);
});

// Graceful shutdown on deploy restarts / container stop / Ctrl+C
process.on("SIGTERM", () => shutdown(0));
process.on("SIGINT", () => shutdown(0));

function shutdown(code) {
  console.log("🛑 Shutting down gracefully...");
  if (server) {
    server.close(() => {
      console.log("✅ HTTP server closed");
      process.exit(code);
    });
    // Force-exit if close() hangs (e.g. open keep-alive connections)
    setTimeout(() => process.exit(code), 10000).unref();
  } else {
    process.exit(code);
  }
}