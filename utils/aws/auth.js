import { Auth } from "aws-amplify";

async function signIn(email, password) {
  try {
    await Auth.signIn({username: email, password });
  } catch (error) {
    console.error('error signing in:', error);
    throw error;
  }
}

async function signUp(email, password) {
  try {
      await Auth.signUp({username: email, password });
  } catch (error) {
      console.error('error signing up:', error);
    throw error;
  }
}

async function signOut() {
  try {
    await Auth.signOut();
  } catch(error) {
    console.error(error);
    throw error;
  }
}


export {
  // auth,
  signIn,
  signUp,
  // signInWithGoogle,
  signOut,
  // getUserProfile,
  // updateUserProfile,
  // getOrCreateUserProfileDocument,
  // sendPasswordResetEmail
}