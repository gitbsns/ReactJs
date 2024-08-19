import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { appointmentReducer } from "slices/appointmentSlice";
import { authReducer } from "slices/authSlice";
import { dynamicListReducer } from "slices/dynamicListSlice";
import { headerReducer } from "slices/headerSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "appointment"],
};

const rootReducer = combineReducers({
  header: headerReducer,
  dynamicList: dynamicListReducer,
  auth: authReducer,
  appointment: appointmentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
