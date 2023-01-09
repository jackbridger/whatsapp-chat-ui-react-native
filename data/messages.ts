import { Conversation } from "../types";

const messages: Conversation[] = [
  {
    id: "1",
    title: "Catchup",
    messages: [
      {
        text: "Hey how are you?",
        time: "12:01 PM",
        userID: 1,
        id: "1",
      },
      {
        text: "Really good thanks! How about you?",
        time: "12:03 PM",
        userID: 2,
        id: "2",
      },
    ],
    users: [1, 2],
  },
  {
    id: "2",
    title: "Jack & Jill",
    messages: [
      {
        text: "Test",
        time: "12:01 PM",
        userID: 1,
        id: "1",
      },
      {
        text: "Test2",
        time: "12:03 PM",
        userID: 2,
        id: "2",
      },
    ],
    users: [1, 2],
  },
  // generate more conversations here
  {
    id: "3",
    title: "Catchup",
    messages: [
      {
        text: "Hey how are you?",
        time: "12:01 PM",
        userID: 1,
        id: "1",
      },
      {
        text: "Really good thanks! How about you?",
        time: "12:03 PM",
        userID: 2,
        id: "2",
      },
    ],
    users: [1, 2],
  },
  {
    id: "4",
    title: "Catchup",
    messages: [
      {
        text: "Hey how are you?",
        time: "12:01 PM",
        userID: 1,
        id: "1",
      },
      {
        text: "Really good thanks! How about you?",
        time: "12:03 PM",
        userID: 2,
        id: "2",
      },
    ],
    users: [1, 2],
  },
];
export default messages;
