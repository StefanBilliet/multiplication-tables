import {
  createContext,
  createElement,
  type FC,
  type PropsWithChildren,
  useContext,
} from "react";
import { useStore } from "zustand";
import {
  type AppState,
  type AppStore,
  createAppStore,
} from "./appStoreFactory";

const appStoreContext = createContext<AppStore | null>(null);

let appStore: AppStore | null = null;

export const setAppStore = (store: AppStore) => {
  appStore = store;
};

export const AppStoreProvider: FC<PropsWithChildren<{ store?: AppStore }>> = ({
  children,
  store,
}) => {
  return createElement(
    appStoreContext.Provider,
    { value: store ?? appStore },
    children,
  );
};

const getAppStore = () => {
  if (!appStore) {
    appStore = createAppStore();
  }

  return appStore;
};

export const useAppStore = <T>(selector: (state: AppState) => T) =>
  useStore(useContext(appStoreContext) ?? getAppStore(), selector);

export { getAppStore };

export const resetAppStore = () => {
  appStore = createAppStore();
};
