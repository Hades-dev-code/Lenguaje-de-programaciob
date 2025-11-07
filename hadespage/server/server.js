import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const API_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_API_KEY;

//  CORS: solo permite frontend en Vercel
app.use(cors({
  origin: "https://lenguaje-de-programaciob-icr72pvti-carlos-projects-00d8fb62.vercel.app"
}));

// Último partido terminado
app.get("/api/team/:id/last-match", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${API_URL}/teams/${id}/matches?status=FINISHED&limit=1`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    if (!response.ok) return res.status(response.status).json({ error: "Error en la API" });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Próximo partido
app.get("/api/team/:id/next-match", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${API_URL}/teams/${id}/matches?status=SCHEDULED&limit=1`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    if (!response.ok) return res.status(response.status).json({ error: "Error en la API" });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Plantilla del equipo (squad)
app.get("/api/team/:id/squad", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${API_URL}/teams/${id}`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    if (!response.ok) return res.status(response.status).json({ error: "Error en la API" });

    const data = await response.json();
    res.json(data.squad);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
