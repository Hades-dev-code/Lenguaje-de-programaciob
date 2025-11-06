// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const API_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_API_KEY; // guarda tu key en .env

app.use(cors());

// Endpoint para obtener datos de un equipo
app.get("/api/team/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${API_URL}/teams/${id}`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error en la API" });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint para obtener partidos de un equipo
app.get("/api/team/:id/matches", async (req, res) => {
  const { id } = req.params;
  const { status = "FINISHED", limit = 1 } = req.query;
  try {
    const response = await fetch(
      `${API_URL}/teams/${id}/matches?status=${status}&limit=${limit}`,
      { headers: { "X-Auth-Token": API_KEY } }
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error en la API" });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
