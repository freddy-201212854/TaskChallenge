import { Request, Response } from 'express';
import { db } from '../connectionFirebase/firebase';

export const getTasks = async (req: Request, res: Response): Promise<any> => {
    try {
      const tasksRef = db.collection('tasks');
      const snapshot = await tasksRef.orderBy('dateCreated', 'desc').get();
  
      if (snapshot.empty) {
        return res.status(404).json({ code: 404, message: 'No hay tareas registradas' });
      }
  
      const list = snapshot.docs.map(doc => doc.data());
  
      return res.status(200).json({ code: 200, message: 'Lista de tareas obtenida correctamente', list });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ code: 500, message: 'Hubo un error al obtener las tareas' });
    }
  };
  
  export const createTask = async (req: Request, res: Response): Promise<any> => {
    const { title, description, status }: { title: string, description: string, status: boolean } = req.body;
  
    if (!title || !description || typeof status !== 'boolean') {
      return res.status(400).json({ code: 400, message: 'Faltan datos requeridos o los datos son inválidos.' });
    }
  
    try {
      const tasksRef = db.collection('tasks');
  
      const snapshot = await tasksRef.orderBy('id', 'desc').limit(1).get();
  
      let nextId = 1;
      if (!snapshot.empty) {
        const largestTask = snapshot.docs[0].data();
        nextId = largestTask.id + 1; // Incrementar el ID más grande
      }
  
      const task = {
        id: nextId,
        title,
        description,
        dateCreated: new Date().toLocaleDateString('en-GB'),
        status,
      };
  
      await tasksRef.add(task);
  
      return res.status(200).json({
        code: 200,
        message: 'Tarea registrada correctamente',
        task,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ code: 500, message: 'Hubo un error al crear la tarea.' });
    }
  };
  
  export const updateTask = async (req: Request, res: Response): Promise<any> => {
    const { taskId } = req.params;
    const { title, description, status }: { title: string, description: string, status: boolean } = req.body;
  
    if (!title && !description && status === undefined) {
      return res.status(400).json({ code: 400, message: 'No se proporcionaron datos válidos para actualizar.' });
    }
  
    try {
      const taskRef = db.collection('tasks');
      const querySnapshot = await taskRef.where('id', '==', parseInt(taskId)).get();
  
      if (querySnapshot.empty) {
        return res.status(404).json({ code: 404, message: 'Tarea no encontrada.' });
      }
  
      const taskDoc = querySnapshot.docs[0];
      const updatedTask: any = {
        title: title || taskDoc.data().title,
        description: description || taskDoc.data().description,
        dateCreated: new Date().toLocaleDateString('en-GB'),
        status: status !== undefined ? status : taskDoc.data().status,
      };
  
      await taskDoc.ref.update(updatedTask);
  
      return res.status(200).json({
        code: 200,
        message: 'Tarea actualizada correctamente',
        taskId,
        updatedFields: updatedTask,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ code: 500, message: 'Hubo un error al actualizar la tarea.' });
    }
  };
  
  export const deleteTask = async (req: Request, res: Response): Promise<any> => {
    const { taskId } = req.params;
  
    try {
      const tasksRef = db.collection('tasks');
      const querySnapshot = await tasksRef.where('id', '==', parseInt(taskId)).get();
  
      if (querySnapshot.empty) {
        return res.status(404).json({ code: 404, message: 'Tarea no encontrada.' });
      }
  
      const taskDoc = querySnapshot.docs[0];
  
      await taskDoc.ref.delete();
  
      return res.status(200).json({
        code: 200,
        message: 'Tarea eliminada correctamente',
        taskId,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ code: 500, message: 'Hubo un error al eliminar la tarea.' });
    }
  };