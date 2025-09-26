import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors'
import { connectDB } from './config/db';

import UserRoutes from './routes/entities/users.routes';
import UserTypesRoutes from './routes/nomenclators/user-types.routes';
import UserStatusesRoutes from './routes/nomenclators/user-status.routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/',
  [
    UserRoutes,
    UserTypesRoutes,
    UserStatusesRoutes,
  ]);

// check endpoint (para verificar que la API este funcionando)
app.get('/api', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'API is running', timestamp: new Date().toISOString() });
});

// Routes not Found
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Endpoint not found', status: 404 });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err. message: undefined, status: 500 });
});

export default app;