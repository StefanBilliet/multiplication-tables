import { renderHook } from '@testing-library/react';
import { resetAppStore, setAppStore } from '../../../app/store/appStoreProvider';
import { createTestProviders } from '../../../shared/testing/createTestProviders';
import testI18n from '../../../shared/testing/i18n';
import useTestQuestionSource from '../../components/useTestQuestionSource';

afterEach(() => {
  resetAppStore();
});

test('GIVEN 4 lifetime rewards, WHEN the test question source is created, THEN it returns questions from unlocked tables only', async () => {
  await testI18n.changeLanguage('en');
  const { TestProviders, store } = createTestProviders();
  store.setState({ lifetimeRewardTotal: 4 });
  setAppStore(store);

  const { result } = renderHook(() => useTestQuestionSource(), { wrapper: TestProviders });
  const questionSequence = result.current;

  expect(questionSequence).toHaveLength(20);
  expect(
    questionSequence.every(
      (question: { table: number; multiplier: number }) => question.table >= 1 && question.table <= 3,
    ),
  ).toBe(true);
  expect(
    new Set(
      questionSequence.map(
        (question: { table: number; multiplier: number }) => `${question.table}:${question.multiplier}`,
      ),
    ).size,
  ).toBe(20);
});
