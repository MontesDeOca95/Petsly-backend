"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
// Configurar  variables de entorno
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
// Funcion para iniciar el servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Conectar a la base de datos
        yield (0, db_1.connectDB)();
        // Iniciar el servidor express
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🕒 Started at: ${new Date().toISOString()}`);
        });
    }
    catch (error) {
        console.log('❌ Failed to start server:', error);
        process.exit(1);
    }
});
// Iniciar la aplicacion
startServer();
// Manejar cierre del servidor
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received. Shutting down gracefully');
    process.exit(0);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});
