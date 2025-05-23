"use server";
import { cookies } from "next/headers";
import { verifyIdToken } from "@/app/lib/firebase/admin";

export async function getUserId() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decodedToken = await verifyIdToken(token);
    console.log("Decoded token:", decodedToken.uid);
    return decodedToken.uid;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
