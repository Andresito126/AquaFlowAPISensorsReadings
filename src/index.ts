import express from 'express';
import cors from "cors";
import { config } from './core/config';
import { measurementRouter } from './measurements/infraestructure/routes/Measurements_routes';

const app = express();
const PORT = config.PORT_SERVER;

// middlewares
app.use(express.json());

// domains for cors
const allowedDomains = config.AVAILABLE_DOMAINS
  ? config.AVAILABLE_DOMAINS.split(',').map(domain => domain.trim())
  : [];

console.log("Allowed domains")
console.log(allowedDomains)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// resources
app.use("/measurements", measurementRouter);  

app.listen(PORT,() => { console.log("Server running on http://localhost:" + PORT )});