import { API } from "aws-amplify";
import * as queries from "graphql/queries";
import * as mutations from "graphql/mutations";

async function createEvent() {
  try {
    await API.graphql({query: mutations.createEvent, variables: { id: userId } });
  } catch(error) {
    console.error(error);
    throw error;
  }
}

async function getEvents() {
  try {
    const response = await API.graphql({query: queries.listEvents });
    return response.data.listEvents;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

export {
  getEvents,
  createEvent
}