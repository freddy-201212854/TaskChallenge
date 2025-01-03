// firebase.ts
import * as admin from 'firebase-admin';

const serviceAccount = require('../../firebase-adminsdk.json');

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app();
}

const db = admin.firestore();

export { db };
