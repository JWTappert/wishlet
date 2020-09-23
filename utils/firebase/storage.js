import { firestore, storage } from "./index";

const uploadPhoto = async (uid, file) => {
  if (!uid || !file) return null;
  try {
    const response = await storage.ref().child('user-profiles').child(uid).child(file.name).put(file)
    return await response.ref.getDownloadURL();
  } catch(error) {
    console.error(error);
    throw error;
  }
};

export {
  uploadPhoto
}