import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Conversation, Message } from "../types";
import sortConversations from "../helpers/sortConversations";
import storage from "@react-native-async-storage/async-storage";
import { PURGE } from "redux-persist";

export interface ConversationState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
}

const initialState: ConversationState = {
  conversations: [],
  currentConversation: null,
};

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addAllConversations: (
      state: ConversationState,
      action: PayloadAction<Conversation[]>
    ): void => {
      state.conversations = sortConversations(action.payload);
    },
    setCurrentConversation: (
      state: ConversationState,
      action: PayloadAction<Conversation>
    ): void => {
      if (action.payload) {
        state.currentConversation = action.payload;
      }
    },
    addNewConversation: (
      state: ConversationState,
      action: PayloadAction<Conversation>
    ): void => {
      if (action.payload) {
        const conversationAlreadyExists = state.conversations.find(
          (conv) => conv.id === action.payload.id
        );
        if (!conversationAlreadyExists) {
          state.conversations = sortConversations([
            ...state.conversations,
            action.payload,
          ]);
        }
      }
    },
    markConversationAsRead: (
      state: ConversationState,
      action: PayloadAction<Conversation>
    ): void => {
      if (action.payload) {
        const conversationToUpdate = state.conversations.find(
          (conversation) => conversation.id === action.payload.id
        );
        if (conversationToUpdate) {
          conversationToUpdate.messages.forEach((message) => {
            message.isRead = true;
          });
        }
      }
    },
    sendMessage: (
      state: ConversationState,
      action: PayloadAction<Message>
    ): void => {
      const message = action.payload;
      const conversationToUpdate = state.conversations.find(
        (conversation) => conversation.id === message.conversationID
      );
      if (conversationToUpdate) {
        conversationToUpdate.messages.push(message);
      }
      if (
        state.currentConversation &&
        message.conversationID === state.currentConversation.id
      ) {
        state.currentConversation.messages.push(message);
      }
      state.conversations = JSON.parse(
        JSON.stringify(sortConversations(state.conversations))
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.removeItem("persist:root");
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  addAllConversations,
  sendMessage,
  setCurrentConversation,
  addNewConversation,
  markConversationAsRead,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
