import '@testing-library/jest-dom/vitest';
import { resetAppStore } from '../../app/store/appStore.ts';
import i18n from '../../platform/i18n';

localStorage.clear();
resetAppStore();

await import('../../platform/i18n');
await i18n.changeLanguage('en');

Object.defineProperty(globalThis, 'matchMedia', {
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

vi.mock('react-confetti', () => ({
  default: vi.fn(() => null),
}));
