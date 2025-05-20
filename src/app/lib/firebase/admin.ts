import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

const initializeAdmin = () => {
  if (!getApps().length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.project_id,
          privateKey: process.env.private_key?.replace(/\\n/g, "\n"),
          clientEmail: process.env.client_email,
        }),
      });
      console.log("Firebase Admin SDK initialized");
    } catch (error) {
      console.error("Firebase Admin SDK initialization error", error);
    }
  }
  return admin;
};

const adminInstance = initializeAdmin();

export const verifyIdToken = (token: string) =>
  admin.auth().verifyIdToken(token);

export { adminInstance as admin };
