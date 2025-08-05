import cors from 'cors';

const corsOptions = {
  origin: process.env.CORS_ORIGIN ,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);
export default corsMiddleware;
