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
    group_name: "this is a test 3!!!",
    participant_ids: uniqueparticipantIDs,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const res = await fetch(
      "https://2082-2a02-c7c-365f-6600-605a-fab1-5972-2093.eu.ngrok.io/conversations/create",
      requestOptions
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
