import { Request, Response } from 'express';
import { db } from '../connectionFirebase/firebase';  // Importamos la referencia a la base de datos de Firebase
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '@t0M$?challenge';

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ code: 400, message: 'Faltan datos requeridos' });
  }

  try {
    const userRef = db.collection('users').doc(email); 
    await userRef.set({ email });

    const token = jwt.sign({ data: { email } }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ code: 200, message: 'Usuario guardado correctamente', token });
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Hubo un error al guardar el usuario' });
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.params;

  try {
    const userRef = db.collection('users').doc(email);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ code: 404, message: 'Usuario no encontrado' });
    }

    const userData = doc.data();
    const token = jwt.sign({ data: userData }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ code: 200, message: 'Usuario encontrado', userData, token });
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Hubo un error al obtener el usuario' });
  }
};
