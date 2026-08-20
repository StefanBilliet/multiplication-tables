import { shuffleAnswerOptions } from '../../utils/practiceFlowUtils';

test('GIVEN controlled randomness, WHEN answer options are shuffled, THEN each swap uses the supplied random value', () => {
  const result = shuffleAnswerOptions([1, 2, 3], () => 0.5);

  expect(result).toEqual([1, 3, 2]);
});
