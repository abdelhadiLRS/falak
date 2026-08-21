import express from "express";
import path from "path";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Serve static files directly from root directory
app.use(express.static(process.cwd()));

// Default route fallback to index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

// Health check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    platform: "Falak (فلك) Static Architecture",
    version: "2.0.0",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Falak static server running on http://0.0.0.0:${PORT}`);
});
