import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { globalErrorHandler } from '@api/middlewares/error.middleware';
import { rawBodyMiddleware } from './api/middlewares/rawBody.middleware';
import { env } from '@api/config/env';

import adminRoutes from '@api/modules/admin/admin.routes';
import tourRoutes from '@api/modules/tour/tour.routes';
import packageRoutes from '@api/modules/packages/packages.routes';
import mediaRoutes from '@api/modules/media/media.routes';
import categoryRoutes from '@api/modules/category/category.routes';
import bookingRoutes from '@api/modules/booking/booking.routes';
import paymentRoutes from '@api/modules/payment/payment.routes';

const app: Application = express();

const allowedOrigins = [env.CLIENT_URL, env.ADMIN_URL];

// Middleware
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(rawBodyMiddleware);

app.use(
    express.json({
        verify: (req: any, res, buf) => {
        req.rawBody = buf.toString();
        },
    })
);

app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev'));


// Security Middlewares
app.use(helmet());
app.use(hpp());


// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many requests, please try again later.'
    }
});
app.use('/api', apiLimiter);


// api routes
app.use('/api/admin', adminRoutes);
app.use('/api/tour', tourRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/payment', paymentRoutes);


// test route
app.get('/api/test', (req: Request, res: Response) => {
    res.json({ message: 'I am just a guy who is hero for fun!'});
});


// 404 handler for undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 404,
        message: 'Request not found.',
    });
});


// Global error handler
app.use(globalErrorHandler);

export default app;