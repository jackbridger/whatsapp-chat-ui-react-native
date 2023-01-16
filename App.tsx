import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation";
import { ConversationsProvider } from "./context/conversationContext";

export default function App() {
  return (
    <ConversationsProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ConversationsProvider>
  );
}
