import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const trackVisit = async (page, userId = null) => {
  try {
    await addDoc(collection(db, "visits"), {
      page,
      userId,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Erreur de tracking :", error);
  }
};
