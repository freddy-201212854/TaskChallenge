import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import { db } from './connectionFirebase/firebase'; // Asegúrate de que firebase está inicializado

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


