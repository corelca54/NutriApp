// src/server.ts
import express from 'express';
import { CitasController } from './controllers/CitasController';
import path from 'path';

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// NUEVO: Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Controladores
const citasController = new CitasController();

// Rutas API
app.post('/citas', citasController.agendar);

// NUEVO: Ruta para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`🚀 Servidor de NutriApp escuchando en http://localhost:${port}`);
    console.log(`✅ Frontend disponible en: http://localhost:${port}`);
    console.log(`✅ API Endpoint: POST http://localhost:${port}/citas`);
});