"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = __importDefault(require("./routes/entities/users.routes"));
const user_types_routes_1 = __importDefault(require("./routes/nomenclators/user-types.routes"));
const user_status_routes_1 = __importDefault(require("./routes/nomenclators/user-status.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use('/', [
    users_routes_1.default,
    user_types_routes_1.default,
    user_status_routes_1.default,
]);
// check endpoint (para verificar que la API este funcionando)
app.get('/api', (_req, res) => {
    res.status(200).json({ status: 'OK', message: 'API is running', timestamp: new Date().toISOString() });
});
// Routes not Found
app.use((_req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found', status: 404 });
});
// Error handler
app.use((err, _req, res, _next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined, status: 500 });
});
exports.default = app;
