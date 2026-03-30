import '@testing-library/jest-dom/vitest';
import { resetAppStore } from '../../app/store/appStore.ts';
import testI18n from './i18n';

process.env.I18NEXT_NO_SUPPORT_NOTICE = '1';
localStorage.clear();
resetAppStore();
await testI18n.changeLanguage('en');

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
