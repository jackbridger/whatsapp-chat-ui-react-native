import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Chat: { conversation: ConversationType };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ConversationType = {
  id: string;
  messages: MessageType[];
  users: number[];
  title: string;
};

export type MessageType = {
  text: string;
  time: Date;
  userID: number;
  id: string;
};

export interface MessageDataType {
  message: MessageType;
}

export type ConversationsContextType = {
  conversations: ConversationType[];
  sendMessage: (
    message: string,
    conversationID: string,
    userID: number,
    setNewMsg: (msg: string) => void,
    isTyping: boolean,
    setIsTyping: (isTyping: boolean) => void
  ) => void;
  getCurrentConversation: () => ConversationType;
  setCurrentConversation: (id: string) => void;
};
