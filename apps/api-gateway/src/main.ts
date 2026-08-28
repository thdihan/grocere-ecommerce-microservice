import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import proxy from 'express-http-proxy';

const port = process.env.API_GATEWAY_PORT
  ? Number(process.env.API_GATEWAY_PORT)
  : 8080;

// Express server app creation.
const app = express();

// CORS middleware
app.use(
  cors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Authorization', 'Content-type'],
    credentials: true,
  }),
);

// Morgan logger.
app.use(morgan('dev'));

// Parser
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());

// Proxy trust
app.set('trust proxy', 1);

// Apply rate limiting.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req: any) => (req.user ? 1000 : 100),
  message: { error: 'Too many requests, please try again later!' },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: any) => req.ip,
});

app.use(limiter);

app.get('/gateway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

app.use('/api/v1/auth', proxy('http://localhost:6001'));

const server = app.listen(port, () => {
  console.log(`[ API GATEWAY ] Listening at http://localhost:${port}`);
});
server.on('error', console.error);
