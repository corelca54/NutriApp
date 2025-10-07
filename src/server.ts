// src/server.ts
import express from 'express';
import { CitasController } from './controllers/CitasController.js';
import path from 'path';
import { fileURLToPath } from 'url';

// ============================================
// OBTENER __dirname EN ES MODULES
// ============================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// 1. INICIALIZACIÓN
// ============================================
const app = express();
const port = 3000;

// ============================================
// 2. MIDDLEWARES
// ============================================
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ============================================
// 3. CONTROLADORES
// ============================================
const citasController = new CitasController();

// ============================================
// 4. RUTAS (ENDPOINTS REST)
// ============================================
app.post('/citas', citasController.agendar);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ============================================
// 5. INICIAR EL SERVIDOR
// ============================================
app.listen(port, () => {
    console.log(`🚀 Servidor de NutriApp escuchando en http://localhost:${port}`);
    console.log(`✅ Frontend disponible en: http://localhost:${port}`);
    console.log(`✅ API Endpoint: POST http://localhost:${port}/citas`);
});