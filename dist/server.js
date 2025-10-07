"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const CitasController_1 = require("./controllers/CitasController");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// Middlewares
app.use(express_1.default.json());
// NUEVO: Servir archivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Controladores
const citasController = new CitasController_1.CitasController();
// Rutas API
app.post('/citas', citasController.agendar);
// NUEVO: Ruta para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.listen(port, () => {
    console.log(`🚀 Servidor de NutriApp escuchando en http://localhost:${port}`);
    console.log(`✅ Frontend disponible en: http://localhost:${port}`);
    console.log(`✅ API Endpoint: POST http://localhost:${port}/citas`);
});
