import { API } from "aws-amplify";
import * as queries from "graphql/queries";
import * as mutations from "graphql/mutations";

async function getUser(userId) {
  try {
    const response = await API.graphql({query: queries.getUser, variables: { id: userId } });
    return response.data.getUser;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

async function updateUser(updates) {
  try {
    const response = await API.graphql({query: mutations.updateUser, variables: { input: updates }});
    return response.data.updateUser;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

async function uploadProfilePhoto() {

}

export {
  getUser,
  updateUser,
  uploadProfilePhoto,
}