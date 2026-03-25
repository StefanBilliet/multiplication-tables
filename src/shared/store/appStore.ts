import { createAppStore } from "./appStoreFactory";
import { setAppStore } from "./appStoreProvider";

export type { AppState, AppStore } from "./appStoreFactory";
export { createAppStore } from "./appStoreFactory";
export {
  AppStoreProvider,
  getAppStore,
  resetAppStore,
  useAppStore,
} from "./appStoreProvider";

setAppStore(createAppStore());
