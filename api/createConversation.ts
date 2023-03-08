import ngrokURL from "../constants/ngrokURL";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export default async function createConversation(
  participantIDs: string[],
  groupName: string,
  ownerID: string
) {
  const uniqueparticipantIDs = [...new Set([...participantIDs, ownerID])];

  const raw = JSON.stringify({
    owner_id: ownerID,
    group_name: groupName,
    participant_ids: uniqueparticipantIDs,
  });
  const baseURL = ngrokURL;
  const createConversationURL: string = `${baseURL}/conversations/create`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const res = await fetch(createConversationURL, requestOptions);
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}


// This one is quite straightforward.
// participant ids is passed but we don't need the owner id