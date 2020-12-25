import {API} from "aws-amplify";
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
    return response.data.listEvents.items.map(serializeEvent);
  } catch(error) {
    console.error(error);
    throw error;
  }
}

function serializeEvent(event) {
  const serializedEvent = {
    title: '',
    createdAt: event.createdAt
  }
  
  if (event.type === 'user') {
    serializedEvent.title = "USER FOLLOWED OTHER USER"
  }
  
  if (event.type === 'wishlist') {}
  
  if (event.type === 'item') {}
  
  return serializedEvent;
}

export {
  getEvents,
  createEvent
}