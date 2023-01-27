import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./redux/store";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import Navigation from "./navigation";

const persistor = persistStore(store);
// use this to clear out all the data
// persistor.purge();

export default function App() {
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
