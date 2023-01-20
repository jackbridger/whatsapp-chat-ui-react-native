import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";

import Navigation from "./navigation";
// import { ConversationsProvider } from "./context/conversationContext";

export default function App() {
  return (
    <ReduxProvider store={store}>
      {/* <ConversationsProvider> */}
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
      {/* </ConversationsProvider> */}
    </ReduxProvider>
  );
}
