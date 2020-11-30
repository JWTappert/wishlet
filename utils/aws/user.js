import { API } from "aws-amplify";
import * as queries from "graphql/queries";
import * as mutations from "graphql/mutations";

async function getUser(userId) {
  try {
    const response = await API.graphql({query: getUserQuery, variables: { id: userId } });
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

const getUserQuery = /* GraphQL */ `
  query GetUser($id: ID!) {
      getUser(id: $id) {
        id
        name
        displayName
        email
        photoURL
        website
        facebook
        instagram
        twitter
        youtube
        wishlists {
          items {
            id
            name
            userID
            updatedAt
            items {
              items {
                createdAt
                id
                link
                name
                photoURL
                updatedAt
                wishlistID
              }
            }
          }
        }
        createdAt
        updatedAt
      }
    }
`;

export {
  getUser,
  updateUser,
  uploadProfilePhoto,
}