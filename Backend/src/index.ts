import express, { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import jwt from 'jsonwebtoken';
import cors from 'cors';

// Inicializar Firebase Admin SDK
const serviceAccount = require('../firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const port = 3000;
const JWT_SECRET = '@t0M$?challenge';

// Middleware para manejar peticiones JSON
app.use(express.json());
app.use(cors());

const verifyToken = (req: any, res: any, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ code:401, error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    req.user = decoded; // Almacenamos los datos del usuario decodificados en el request
    next();
  } catch (error) {
    return res.status(401).json({ code:401, error: 'Sesión expirada' });
  }
};

app.post('/users', async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ code: 400, error: 'Faltan datos requeridos' });
  }

  try {
    // Guardar datos en Firestore
    const userRef = db.collection('users').doc(email); // Usamos el correo como ID
    await userRef.set({
      email
    });

    const token = jwt.sign({ data: {email: email}, }, JWT_SECRET, {
      expiresIn: '1h', // Expira en 1 hora
    });

    return res.status(200).json({ code: 200, message: 'Usuario guardado correctamente' });
  } catch (error) {
    return res.status(500).json({ code: 500, error: 'Hubo un error al guardar el usuario' });
  }
});

app.get('/users/:email', async (req: Request, res: Response): Promise<any> => {
    const { email } = req.params;
    try {
      // Buscar el documento del usuario usando el correo
      const userRef = db.collection('users').doc(email);
      const doc = await userRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ code: 404, error: 'Usuario no encontrado' });
      }
  
      // Devolver los datos del usuario
      const userData = doc.data();

       // Generar el JWT
      const token = jwt.sign({ data: userData }, JWT_SECRET, {
        expiresIn: '1h', // Expira en 1 hora
      });

      return res.status(200).json({ code: 200, message: 'Usuario registrado', userData, token: token });
    } catch (error) {
      return res.status(500).json({ code: 500, error: 'Hubo un error al obtener el usuario' });
    }
  });

  app.get('/tasks', verifyToken, async (req: Request, res: Response): Promise<any> => {
    try {
      // Buscar el documento del usuario usando el correo
      const userRef = db.collection('tasks');
      const doc = await userRef.get();
  
      if (doc.empty) {
        return res.status(404).json({ code: 404, message: 'No hay tareas registradas' });
      }
  
      const list = doc.docs.map(doc => doc.data());

      return res.status(200).json({ code:200, message: 'Lista de tareas obtenida correctamente', list });
    } catch (error) {
      return res.status(500).json({ code: 500, error: 'Hubo un error al obtener las tareas' });
    }
  });

  app.post('/tasks', verifyToken, async (req: Request, res: Response): Promise<any> => {
    const { title, description, dateCreated, status }: { title: string, description: string, dateCreated: string, status: boolean } = req.body;
  
    // Validar que los datos necesarios están presentes
    if (!title || !description || typeof status !== 'boolean') {
      return res.status(400).json({ code: 400, error: 'Faltan datos requeridos o los datos son inválidos.' });
    }
  
    try {
      
      const tasksRef = db.collection('tasks');
      const snapshot = await tasksRef.get();
      const nextId = snapshot.size + 1;

      const tarea = {
        id: nextId,
        title,
        description,
        dateCreated: new Date().toLocaleDateString(),
        status,
      };
  
      // Agregar la tarea a Firestore
      const newTaskRef = await tasksRef.add(tarea);
  

      return res.status(200).json({ 
        code:200, 
        message: 'Tarea registrada',
        id: nextId,
        title,
        description,
        dateCreated,
        status,
      });
    } catch (error) {
      return res.status(500).json({ code: 500, error: 'Hubo un error al crear la tarea.' });
    }
  });

  app.put('/tasks/:taskId', verifyToken, async (req: Request, res: Response): Promise<any> => {
    const { taskId } = req.params;
    const { title, description, status }: { title: string, description: string, status: boolean } = req.body;
  
    if (!title && !description && status === undefined) {
      return res.status(400).json({ error: 'No se proporcionaron datos válidos para actualizar.' });
    }
  
    try {
      // Obtener la referencia del documento con el ID proporcionado
      const taskRef = db.collection('tasks');
      const querySnapshot = await taskRef.where('id', '==', parseInt(taskId)).get();

      if (querySnapshot.empty) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
      }
  
      const taskDoc = querySnapshot.docs[0];
      const taskData = taskDoc.data();
      const updatedTask: any = {
        title: title,
        description: description,
        dateCreated: new Date().toLocaleDateString(),
        status: status,
      };
      
      // Actualizar la tarea en Firestore
      await taskDoc.ref.update(updatedTask);
  
      return res.status(200).json({
        code: 200,
        message: 'Tarea actualizada',
        id: taskId,
        updatedFields: updatedTask,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Hubo un error al actualizar la tarea.' });
    }
  });
  
  app.delete('/tasks/:taskId', verifyToken, async (req: Request, res: Response): Promise<any> => {
    const { taskId } = req.params; // Obtener el ID de la tarea de los parámetros de la URL
  
    try {
      const tasksRef = db.collection('tasks');
      const querySnapshot = await tasksRef.where('id', '==', parseInt(taskId)).get();
  
      if (querySnapshot.empty) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
      }
  
      const taskDoc = querySnapshot.docs[0];
  
      // Eliminar la tarea
      await taskDoc.ref.delete();
  
      return res.status(200).json({
        code: 200,
        message: 'Tarea eliminada correctamente',
        id: taskId,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Hubo un error al eliminar la tarea.' });
    }
  });

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
