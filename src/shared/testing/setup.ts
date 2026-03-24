import "@testing-library/jest-dom/vitest";
import i18n from "../i18n";
import { resetAppStore } from "../store/appStore.ts";

localStorage.clear();
resetAppStore();

await import("../i18n");
await i18n.changeLanguage("en");

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

vi.mock("react-confetti", () => ({
  default: vi.fn(() => null),
}));
