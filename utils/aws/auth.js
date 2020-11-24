import { API, Auth, graphqlOperation } from "aws-amplify";
import {getUser} from "graphql/queries";

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

async function forgotPassword(email) {
  try {
    await Auth.forgotPassword(email);
  } catch(error) {
    console.error(error);
    throw error;
  }
}

async function forgotPasswordSubmit(username, code, password) {
  try {
    await Auth.forgotPasswordSubmit(username, code, password);
  } catch(error) {
    console.error(error);
    throw error;
  }
}

export {
  signIn,
  signUp,
  signOut,
  forgotPassword,
  forgotPasswordSubmit,
}