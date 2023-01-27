import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useEffect } from "react";
import { io } from "socket.io-client";

import Navigation from "./navigation";

const persistor = persistStore(store);
// use this to clear out all the data
// persistor.purge();

var socket = io();

export default function App() {
  useEffect(() => {
    socket.emit("join", {
      id: "7e1903aa-0839-445e-b041-8325bae7900f",
      username: "nsmet",
      created_at: "2023-01-20 12:46:37",
    });
    console.log("joined a socket");

    socket.on("message", (message) => {
      console.log("MESSAGE RECEIVED");
      console.log(message);
    });

    return () => {};
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
