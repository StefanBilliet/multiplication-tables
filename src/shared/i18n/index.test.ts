import { beforeEach, expect, test, vi } from 'vitest';

const initMock = vi.fn();
const languageDetectorPlugin = { type: 'languageDetectorPlugin' };
const initReactI18nextPlugin = { type: 'initReactI18nextPlugin' };
const persistedLanguageStorageKey = 'selectedLanguage';
const i18nChain = {
  use: vi.fn(),
  init: initMock,
};
const useMock = vi.fn(() => i18nChain);

vi.mock('i18next', () => ({
  default: {
    use: useMock,
  },
}));

vi.mock('react-i18next', () => ({
  initReactI18next: initReactI18nextPlugin,
}));

vi.mock('i18next-browser-languagedetector', () => ({
  default: languageDetectorPlugin,
}));

beforeEach(() => {
  vi.resetModules();
  initMock.mockReset();
  useMock.mockClear();
  i18nChain.use.mockImplementation(() => i18nChain);
  i18nChain.use.mockClear();
  localStorage.clear();

  Object.defineProperty(window.navigator, 'language', {
    configurable: true,
    value: 'nl-BE',
  });
});

test('GIVEN a saved language preference exists WHEN i18n is initialized THEN the saved language is used before browser detection', async () => {
  localStorage.setItem(persistedLanguageStorageKey, 'en');

  await import('./index');

  expect(initMock).toHaveBeenCalledWith(
    expect.objectContaining({
      fallbackLng: 'nl',
      supportedLngs: ['nl', 'en'],
      detection: expect.objectContaining({
        lookupLocalStorage: persistedLanguageStorageKey,
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      }),
    }),
  );
});

test('GIVEN the browser language starts with nl WHEN i18n is initialized THEN Dutch is used as the startup language', async () => {
  await import('./index');

  expect(initMock).toHaveBeenCalledWith(
    expect.objectContaining({
      fallbackLng: 'nl',
      supportedLngs: ['nl', 'en'],
      detection: expect.objectContaining({
        lookupLocalStorage: persistedLanguageStorageKey,
        caches: ['localStorage'],
        order: ['localStorage', 'navigator'],
      }),
    }),
  );
});

test('GIVEN the browser language starts with en WHEN i18n is initialized THEN English is supported as a detected language', async () => {
  Object.defineProperty(window.navigator, 'language', {
    configurable: true,
    value: 'en-GB',
  });

  await import('./index');

  expect(initMock).toHaveBeenCalledWith(
    expect.objectContaining({
      fallbackLng: 'nl',
      supportedLngs: ['nl', 'en'],
      detection: expect.objectContaining({
        lookupLocalStorage: persistedLanguageStorageKey,
        caches: ['localStorage'],
        order: ['localStorage', 'navigator'],
      }),
    }),
  );
});

test('GIVEN the browser language is unsupported WHEN i18n is initialized THEN Dutch is used as the fallback language', async () => {
  Object.defineProperty(window.navigator, 'language', {
    configurable: true,
    value: 'fr-FR',
  });

  await import('./index');

  expect(initMock).toHaveBeenCalledWith(
    expect.objectContaining({
      fallbackLng: 'nl',
      supportedLngs: ['nl', 'en'],
      detection: expect.objectContaining({
        lookupLocalStorage: persistedLanguageStorageKey,
        caches: ['localStorage'],
        order: ['localStorage', 'navigator'],
      }),
    }),
  );
});

test('WHEN i18n is initialized THEN the browser language detector plugin is registered', async () => {
  await import('./index');

  expect(useMock).toHaveBeenCalledWith(languageDetectorPlugin);
  expect(i18nChain.use).toHaveBeenCalledWith(initReactI18nextPlugin);
});
