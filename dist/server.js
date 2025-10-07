"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const CitasController_1 = require("./controllers/CitasController");
// 1. Inicialización
const app = (0, express_1.default)();
const port = 3000;
// 2. Middlewares
// Este middleware es crucial para que Express pueda entender el JSON que envía el cliente.
app.use(express_1.default.json());
// 3. Controladores
const citasController = new CitasController_1.CitasController();
// 4. Rutas (Endpoints REST)
// Aquí definimos que las peticiones POST a la URL '/citas' serán manejadas
// por el método 'agendar' de nuestro controlador.
app.post('/citas', citasController.agendar);
// 5. Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor de NutriApp escuchando en http://localhost:${port}`);
    console.log(`✅ Endpoint listo: POST http://localhost:${port}/citas`);
});
