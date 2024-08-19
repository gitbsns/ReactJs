import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-international-phone/style.css";
import { Provider } from "react-redux";
import "assets/scss/globalStyleSheet.scss";
import "animate.css";
import { persistor, store } from "store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
