import { gql, GraphQLClient } from "graphql-request";

const apiURL = "http://tourn.me/usher/api";
const client = new GraphQLClient(apiURL);

export const validateShow = async (id: string): Promise<Show | string> => {
  const query = gql`
  query Query($id: String!) {
    validateShow(id: $id) {
      show {
        id
        date
        event {
          name
        }
      }
      error
    }
  }`
  try {
    const { validateShow } = await client.request(query, { id });
    if (validateShow.error) return validateShow.error;
    return validateShow.show as Show
  } catch (e) {
    return 'Connection error';
  }
}

export const validateTicket = async (showId: string, ticketId: string): Promise<Ticket | string> => {
  const mutation = gql`
    mutation Mutation($showId: String!, $ticketId: String!) {
    validateTicket(showId: $showId, ticketId: $ticketId) {
      error
      ticket 
    }
  }`

  try {
    const { validateTicket } = await client.request(mutation, { showId, ticketId });
    if (validateTicket.error) return validateTicket.error;
    return validateTicket.ticket as Ticket
  } catch (e) {
    return 'Connection error';
  }
}
