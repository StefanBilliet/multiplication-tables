import { createTestQuestionSequenceFactory } from '../../models/testQuestionSequenceFactory';

test('GIVEN unlocked tables, WHEN the test question sequence is created, THEN it uses only unlocked tables without duplicates', () => {
  const questionSequence = createTestQuestionSequenceFactory([2, 4]).random();

  expect(questionSequence).toHaveLength(20);
  expect(questionSequence.every((question) => question.table === 2 || question.table === 4)).toBe(true);
  expect(new Set(questionSequence.map((question) => `${question.table}:${question.multiplier}`)).size).toBe(20);
});
